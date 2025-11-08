
from dataclasses import dataclass, field
from typing import Optional, Dict

@dataclass
class CourseModuleCreateModel:
    Name: str = field(metadata={"min_length": 0, "max_length": 64})
    Description: str = field(metadata={"min_length": 0, "max_length": 64})
    ImageUrl: str = field(metadata={"min_length": 0, "max_length": 64})
    DurationInMins: str = field(metadata={"min_length": 0, "max_length": 64})
    Sequence: str = field(metadata={"min_length": 0, "max_length": 64})


@dataclass
class CourseModuleUpdateModel:
    Name: str = field(metadata={"min_length": 0, "max_length": 64})
    Description: str = field(metadata={"min_length": 0, "max_length": 64})
    ImageUrl: str = field(metadata={"min_length": 0, "max_length": 64})
    DurationInMins: str = field(metadata={"min_length": 0, "max_length": 64})
    Sequence: str = field(metadata={"min_length": 0, "max_length": 64})


@dataclass
class CourseModuleSearchParams:
    Name: str = field(metadata={"min_length": 0, "max_length": 64})
    Description: str = field(metadata={"min_length": 0, "max_length": 64})
    ImageUrl: str = field(metadata={"min_length": 0, "max_length": 64})
    DurationInMins: str = field(metadata={"min_length": 0, "max_length": 64})
    Sequence: str = field(metadata={"min_length": 0, "max_length": 64})


@dataclass
class ApiResponse:
    Data: Dict
    Message: Optional[str] = field(default=None, metadata={"min_length": 2, "max_length": 500})
    Success: Optional[bool] = None
