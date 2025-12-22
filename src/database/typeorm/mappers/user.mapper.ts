import { User } from '../models/user.entity';
import { UserResponseDto } from '../../../domain.types/user.types';

///////////////////////////////////////////////////////////////////////////////////

export class UserMapper {
    static toResponseDto = (user: User): UserResponseDto => {
        if (user == null) {
            return null;
        }
        const dto: UserResponseDto = {
            id: user.id,
            UserName: user.UserName,
            FirstName: user.FirstName,
            LastName: user.LastName,
            ProfileImageUrl: user.ProfileImageUrl,
            CreatedAt: user.CreatedAt,
            UpdatedAt: user.UpdatedAt,
        };
        return dto;
    };
}
