
from dataclasses import dataclass, field
from typing import Optional, Dict

@dataclass
class LearningPathCoursesCreateModel:


@dataclass
class LearningPathCoursesUpdateModel:


@dataclass
class LearningPathCoursesSearchParams:


@dataclass
class ApiResponse:
    Data: Dict
    Message: Optional[str] = field(default=None, metadata={"min_length": 2, "max_length": 500})
    Success: Optional[bool] = None
