
from dataclasses import dataclass, field
from typing import Optional, Dict

@dataclass
class UserLearningCreateModel:
    UserId: str = field(metadata={"min_length": 0, "max_length": 64})
    ActionId: str = field(metadata={"min_length": 0, "max_length": 64})
    ProgressStatus: str = field(metadata={"min_length": 0, "max_length": 64})
    PercentageCompletion: str = field(metadata={"min_length": 0, "max_length": 64})


@dataclass
class UserLearningUpdateModel:
    UserId: str = field(metadata={"min_length": 0, "max_length": 64})
    ActionId: str = field(metadata={"min_length": 0, "max_length": 64})
    ProgressStatus: str = field(metadata={"min_length": 0, "max_length": 64})
    PercentageCompletion: str = field(metadata={"min_length": 0, "max_length": 64})


@dataclass
class UserLearningSearchParams:
    UserId: str = field(metadata={"min_length": 0, "max_length": 64})
    ActionId: str = field(metadata={"min_length": 0, "max_length": 64})
    ProgressStatus: str = field(metadata={"min_length": 0, "max_length": 64})
    PercentageCompletion: str = field(metadata={"min_length": 0, "max_length": 64})


@dataclass
class ApiResponse:
    Data: Dict
    Message: Optional[str] = field(default=None, metadata={"min_length": 2, "max_length": 500})
    Success: Optional[bool] = None
