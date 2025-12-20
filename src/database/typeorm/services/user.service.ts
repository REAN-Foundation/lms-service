import { FindManyOptions, Like, Repository } from 'typeorm';
import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { Source } from '../typeorm.database.connector';
import { BaseService } from './base.service';
import {
    UserCreateModel,
    UserResponseDto,
    UserSearchFilters,
    UserSearchResults,
    UserUpdateModel,
} from '../../../domain.types/user.types';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '../models/user.entity';
import { NeedleService } from '../../../common/needle.service';

///////////////////////////////////////////////////////////////////////

export class UserService extends BaseService {
    //#region Repositories

    _userRepository: Repository<User> = Source.getRepository(User);

    //#endregion

    public create = async (createModel: UserCreateModel): Promise<UserResponseDto> => {
        const user = this._userRepository.create({
            id: createModel.id,
            UserName: createModel.UserName,
            FirstName: createModel.FirstName,
            LastName: createModel.LastName,
            ProfileImageUrl: createModel.ProfileImageUrl,
        });
        var record = await this._userRepository.save(user);
        return UserMapper.toResponseDto(record);
    };

    public getById = async (id: uuid): Promise<UserResponseDto> => {
        try {
            var user = await this._userRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!user) {
                ErrorHandler.throwNotFoundError('User not found!');
            }
            return UserMapper.toResponseDto(user);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: UserSearchFilters): Promise<UserSearchResults> => {
        try {
            var search = this.getSearchObject(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._userRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map((x) => UserMapper.toResponseDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: UserUpdateModel): Promise<UserResponseDto> => {
        try {
            const user = await this._userRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!user) {
                ErrorHandler.throwNotFoundError('User not found!');
            }

            if (model.UserName !== undefined && model.UserName != null) {
                user.UserName = model.UserName;
            }

            if (model.FirstName !== undefined && model.FirstName != null) {
                user.FirstName = model.FirstName;
            }

            if (model.LastName !== undefined && model.LastName != null) {
                user.LastName = model.LastName;
            }

            if (model.ProfileImageUrl !== undefined && model.ProfileImageUrl != null) {
                user.ProfileImageUrl = model.ProfileImageUrl;
            }

            var record = await this._userRepository.save(user);
            return UserMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._userRepository.findOne({
                where: {
                    id: id,
                },
            });
            var result = await this._userRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchObject = (filters: UserSearchFilters) => {
        var search: FindManyOptions<User> = {
            relations: {},
            where: {},
            select: {
                id: true,
                UserName: true,
                FirstName: true,
                LastName: true,
                ProfileImageUrl: true,
                CreatedAt: true,
                UpdatedAt: true,
            },
        };

        if (filters.userName) {
            search.where['UserName'] = Like(`%${filters.userName}%`);
        }

        if (filters.firstName) {
            search.where['FirstName'] = Like(`%${filters.firstName}%`);
        }

        if (filters.lastName) {
            search.where['LastName'] = Like(`%${filters.lastName}%`);
        }

        if (filters.profileImageUrl) {
            search.where['ProfileImageUrl'] = Like(`%${filters.profileImageUrl}%`);
        }

        return search;
    };

    //#endregion

    /**
     * Fetches user details from Reancare service and creates/updates the user in local database
     * @param userId - The user ID to fetch from Reancare
     * @param accessToken - Optional access token for Reancare API
     * @returns UserResponseDto of the created/updated user
     */
    public fetchAndSyncUserFromReancare = async (userId: uuid, accessToken?: string): Promise<UserResponseDto> => {
        try {
            // Fetch user from Reancare service
            const apiURL = `/users/${userId}`;
            const reancareResponse = await NeedleService.needleRequestForREAN('get', apiURL, accessToken);

            if (!reancareResponse || reancareResponse.Status !== 'success' || !reancareResponse.Data) {
                logger.warn(`Failed to fetch user ${userId} from Reancare service`);
                // Don't throw error, just log warning - enrollment should still proceed
                return null;
            }

            const reancareUser = reancareResponse.Data;

            // Map Reancare user data to our User model
            // Adjust these mappings based on actual Reancare user response structure
            const userData: UserCreateModel = {
                id: reancareUser.id || userId,
                UserName: reancareUser.UserName || reancareUser.userName || reancareUser.email || '',
                FirstName: reancareUser.FirstName || reancareUser.firstName || reancareUser.Person?.FirstName || null,
                LastName: reancareUser.LastName || reancareUser.lastName || reancareUser.Person?.LastName || null,
                ProfileImageUrl: reancareUser.ProfileImageUrl || reancareUser.profileImageUrl || reancareUser.Person?.ProfileImageUrl || null,
            };

            // Check if user already exists in local database
            const existingUser = await this._userRepository.findOne({
                where: { id: userData.id },
            });

            if (existingUser) {
                // Update existing user
                if (userData.UserName) existingUser.UserName = userData.UserName;
                if (userData.FirstName !== undefined) existingUser.FirstName = userData.FirstName;
                if (userData.LastName !== undefined) existingUser.LastName = userData.LastName;
                if (userData.ProfileImageUrl !== undefined) existingUser.ProfileImageUrl = userData.ProfileImageUrl;

                const updatedUser = await this._userRepository.save(existingUser);
                logger.info(`User ${userId} updated from Reancare service`);
                return UserMapper.toResponseDto(updatedUser);
            } else {
                // Create new user
                const newUser = this._userRepository.create({
                    id: userData.id,
                    UserName: userData.UserName,
                    FirstName: userData.FirstName,
                    LastName: userData.LastName,
                    ProfileImageUrl: userData.ProfileImageUrl,
                });
                const savedUser = await this._userRepository.save(newUser);
                logger.info(`User ${userId} created from Reancare service`);
                return UserMapper.toResponseDto(savedUser);
            }
        } catch (error) {
            logger.error(`Error fetching user ${userId} from Reancare service: ${error.message}`);
            // Don't throw error - enrollment should still proceed even if user sync fails
            return null;
        }
    };
}
