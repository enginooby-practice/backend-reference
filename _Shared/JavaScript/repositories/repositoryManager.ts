import * as path from "path";
import {ITaskRepository} from "./base/ITaskRepository";
import {IUserRepository} from "./base/IUserRepository";
import {MockTaskRepository} from "./mock/MockTaskRepository";
import {MockUserRepository} from "./mock/MockUserRepository";
import {MongoDbTaskRepository} from "./mongodb/MongoDbTaskRepository";
import {MongoDbUserRepository} from "./mongodb/MongoDbUserRepository";
import {SequelizeTaskRepository} from "./sequelize/SequelizeTaskRepository";
import {SequelizeUserRepository} from "./sequelize/SequelizeUserRepository";
import {FirebaseTaskRepository} from "./firebase/FirebaseTaskRepository";
import {FirebaseUserRepository} from "./firebase/FirebaseUserRepository";

enum RepositoryType {Mock, MongoDb, Sequelize, Firebase}

const REPOSITORY: RepositoryType = RepositoryType.MongoDb;

export let taskRepository: ITaskRepository;
export let userRepository: IUserRepository;

function InitializeRepositories() {
    switch (REPOSITORY) {
        case RepositoryType.Mock:
            // TODO: Get from root folder
            taskRepository = new MockTaskRepository(path.join(__dirname, "../../_Shared/tasks.json"));
            userRepository = new MockUserRepository(path.join(__dirname, "../../_Shared/users.json"));
            break;
        case RepositoryType.MongoDb:
            taskRepository = new MongoDbTaskRepository();
            userRepository = new MongoDbUserRepository();
            break;
        case RepositoryType.Sequelize:
            taskRepository = new SequelizeTaskRepository();
            userRepository = new SequelizeUserRepository();
            break;
        case RepositoryType.Firebase:
            taskRepository = new FirebaseTaskRepository("tasks");
            userRepository = new FirebaseUserRepository("users");
            break;
        default:
            break;
    }
}

InitializeRepositories();