# /backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Set
from collections import defaultdict, deque
import logging

app = FastAPI(title="Pipeline Parser API", version="1.0.0")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Pydantic models for request/response
class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

class DAGAnalyzer:
    """Utility class to analyze if a graph forms a Directed Acyclic Graph (DAG)"""
    
    def __init__(self, nodes: List[Node], edges: List[Edge]):
        self.nodes = {node.id: node for node in nodes}
        self.edges = edges
        self.adjacency_list = self._build_adjacency_list()
    
    def _build_adjacency_list(self) -> Dict[str, List[str]]:
        """Build adjacency list representation of the graph"""
        adj_list = defaultdict(list)
        
        # Initialize all nodes in the adjacency list
        for node in self.nodes:
            adj_list[node] = []
        
        # Add edges to adjacency list
        for edge in self.edges:
            if edge.source in self.nodes and edge.target in self.nodes:
                adj_list[edge.source].append(edge.target)
        
        return adj_list
    
    def is_dag(self) -> bool:
        """
        Check if the graph is a DAG using DFS and cycle detection.
        Uses the "white-gray-black" algorithm for cycle detection.
        """
        # Color coding: 0 = white (unvisited), 1 = gray (visiting), 2 = black (visited)
        color = {node_id: 0 for node_id in self.nodes}
        
        def has_cycle_dfs(node_id: str) -> bool:
            """DFS helper function to detect cycles"""
            if color[node_id] == 1:  # Gray - back edge found (cycle)
                return True
            if color[node_id] == 2:  # Black - already processed
                return False
            
            # Mark as gray (currently visiting)
            color[node_id] = 1
            
            # Visit all neighbors
            for neighbor in self.adjacency_list[node_id]:
                if has_cycle_dfs(neighbor):
                    return True
            
            # Mark as black (finished processing)
            color[node_id] = 2
            return False
        
        # Check for cycles starting from each unvisited node
        for node_id in self.nodes:
            if color[node_id] == 0:  # Unvisited
                if has_cycle_dfs(node_id):
                    return False
        
        return True
    
    def get_analysis(self) -> Dict[str, Any]:
        """Get comprehensive analysis of the pipeline"""
        return {
            "num_nodes": len(self.nodes),
            "num_edges": len(self.edges),
            "is_dag": self.is_dag(),
            "adjacency_info": {
                "nodes_with_no_inputs": self._get_source_nodes(),
                "nodes_with_no_outputs": self._get_sink_nodes(),
                "max_depth": self._calculate_max_depth() if self.is_dag() else None
            }
        }
    
    def _get_source_nodes(self) -> List[str]:
        """Get nodes with no incoming edges"""
        targets = {edge.target for edge in self.edges}
        return [node_id for node_id in self.nodes if node_id not in targets]
    
    def _get_sink_nodes(self) -> List[str]:
        """Get nodes with no outgoing edges"""
        sources = {edge.source for edge in self.edges}
        return [node_id for node_id in self.nodes if node_id not in sources]
    
    def _calculate_max_depth(self) -> int:
        """Calculate the maximum depth of the DAG using topological sorting"""
        if not self.is_dag():
            return -1
        
        # Calculate in-degree for each node
        in_degree = {node_id: 0 for node_id in self.nodes}
        for edge in self.edges:
            in_degree[edge.target] += 1
        
        # Initialize queue with nodes having no incoming edges
        queue = deque([node_id for node_id, degree in in_degree.items() if degree == 0])
        depth = {node_id: 0 for node_id in self.nodes}
        max_depth = 0
        
        while queue:
            current = queue.popleft()
            
            for neighbor in self.adjacency_list[current]:
                in_degree[neighbor] -= 1
                depth[neighbor] = max(depth[neighbor], depth[current] + 1)
                max_depth = max(max_depth, depth[neighbor])
                
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        
        return max_depth

# API Endpoints
@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Pipeline Parser API is running",
        "version": "1.0.0",
        "endpoints": {
            "/pipelines/parse": "POST - Analyze pipeline structure",
            "/health": "GET - Health check"
        }
    }

@app.get("/health")
async def health():
    """Detailed health check"""
    return {
        "status": "healthy",
        "service": "Pipeline Parser API",
        "version": "1.0.0"
    }

@app.post("/pipelines/parse", response_model=PipelineResponse)
async def parse_pipeline(pipeline: PipelineRequest):
    """
    Parse and analyze a pipeline to determine if it forms a valid DAG.
    
    Args:
        pipeline: Pipeline data containing nodes and edges
    
    Returns:
        Analysis results including node count, edge count, and DAG status
    """
    try:
        logger.info(f"Received pipeline with {len(pipeline.nodes)} nodes and {len(pipeline.edges)} edges")
        
        # Log pipeline details for debugging
        node_types = {}
        for node in pipeline.nodes:
            node_type = node.type
            node_types[node_type] = node_types.get(node_type, 0) + 1
        
        logger.info(f"Node types: {node_types}")
        
        # Validate input
        if not pipeline.nodes:
            logger.warning("Pipeline has no nodes")
        
        if not pipeline.edges:
            logger.warning("Pipeline has no edges")
        
        # Create analyzer and perform analysis
        analyzer = DAGAnalyzer(pipeline.nodes, pipeline.edges)
        analysis = analyzer.get_analysis()
        
        result = PipelineResponse(
            num_nodes=analysis["num_nodes"],
            num_edges=analysis["num_edges"],
            is_dag=analysis["is_dag"]
        )
        
        logger.info(f"Analysis complete: {result.dict()}")
        
        # Log additional insights
        if analysis["adjacency_info"]["max_depth"] is not None:
            logger.info(f"Pipeline max depth: {analysis['adjacency_info']['max_depth']}")
        
        source_nodes = analysis["adjacency_info"]["nodes_with_no_inputs"]
        sink_nodes = analysis["adjacency_info"]["nodes_with_no_outputs"]
        
        if source_nodes:
            logger.info(f"Source nodes (no inputs): {source_nodes}")
        if sink_nodes:
            logger.info(f"Sink nodes (no outputs): {sink_nodes}")
        
        return result
        
    except Exception as e:
        logger.error(f"Error processing pipeline: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error analyzing pipeline: {str(e)}"
        )

@app.get("/pipelines/analyze/{pipeline_id}")
async def get_pipeline_analysis(pipeline_id: str):
    """
    Placeholder endpoint for retrieving stored pipeline analysis.
    This could be expanded to store and retrieve pipeline analyses.
    """
    # This would typically query a database
    return {
        "message": f"Analysis retrieval for pipeline {pipeline_id} not implemented yet",
        "suggestion": "Use POST /pipelines/parse to analyze a pipeline"
    }

if __name__ == "__main__":
    import uvicorn
    
    # For development - run with: python main.py
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )