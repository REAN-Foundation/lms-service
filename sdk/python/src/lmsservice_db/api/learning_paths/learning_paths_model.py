
from dataclasses import dataclass, field
from typing import Optional, Dict

@dataclass
class LearningPathCreateModel:
    TenantId: str = field(metadata={"min_length": 0, "max_length": 64})
    Name: str = field(metadata={"min_length": 0, "max_length": 64})
    Description: str = field(metadata={"min_length": 0, "max_length": 64})
    ImageUrl: str = field(metadata={"min_length": 0, "max_length": 64})
    DurationInDays: str = field(metadata={"min_length": 0, "max_length": 64})
    PreferenceWeight: str = field(metadata={"min_length": 0, "max_length": 64})
    Enabled: str = field(metadata={"min_length": 0, "max_length": 64})


@dataclass
class LearningPathUpdateModel:
    TenantId: str = field(metadata={"min_length": 0, "max_length": 64})
    Name: str = field(metadata={"min_length": 0, "max_length": 64})
    Description: str = field(metadata={"min_length": 0, "max_length": 64})
    ImageUrl: str = field(metadata={"min_length": 0, "max_length": 64})
    DurationInDays: str = field(metadata={"min_length": 0, "max_length": 64})
    PreferenceWeight: str = field(metadata={"min_length": 0, "max_length": 64})
    Enabled: str = field(metadata={"min_length": 0, "max_length": 64})


@dataclass
class LearningPathSearchParams:
    TenantId: str = field(metadata={"min_length": 0, "max_length": 64})
    Name: str = field(metadata={"min_length": 0, "max_length": 64})
    Description: str = field(metadata={"min_length": 0, "max_length": 64})
    ImageUrl: str = field(metadata={"min_length": 0, "max_length": 64})
    DurationInDays: str = field(metadata={"min_length": 0, "max_length": 64})
    PreferenceWeight: str = field(metadata={"min_length": 0, "max_length": 64})
    Enabled: str = field(metadata={"min_length": 0, "max_length": 64})


@dataclass
class ApiResponse:
    Data: Dict
    Message: Optional[str] = field(default=None, metadata={"min_length": 2, "max_length": 500})
    Success: Optional[bool] = None
