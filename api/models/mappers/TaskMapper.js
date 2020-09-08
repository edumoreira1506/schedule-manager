import TaskDTO from '../dtos/TaskDTO.js';
import Mapper from './Mapper.js';

export default class TaskMapper {
  static toDTO(user) {
    return new TaskDTO(user);
  }

  static toEntity(taskDTO) {
    return Mapper.toEntity(taskDTO);
  }
}

