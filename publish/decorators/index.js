"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUnique = exports.IsUniqueConstraint = void 0;
const constants_1 = require("../constants");
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let IsUniqueConstraint = class IsUniqueConstraint {
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    validate(value, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const [options] = args === null || args === void 0 ? void 0 : args.constraints;
            const { table, column, updateId } = options;
            const colName = column !== null && column !== void 0 ? column : args.property;
            const dataExist = yield this.entityManager
                .getRepository(table)
                .createQueryBuilder(table)
                .where({ [colName]: value });
            if (updateId) {
                const id = args === null || args === void 0 ? void 0 : args.object[updateId];
                if (id) {
                    dataExist.andWhere({ [updateId]: (0, typeorm_1.Not)(id) });
                }
            }
            return !(yield dataExist.getExists());
        });
    }
    defaultMessage(validationArguments) {
        const field = validationArguments.property;
        return `${capitalizeFirstLetter(field)} already exist.`;
    }
};
IsUniqueConstraint = __decorate([
    (0, class_validator_2.ValidatorConstraint)({ name: constants_1.ISUNIQUECONSTRANTNAME, async: true }),
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectEntityManager)())
], IsUniqueConstraint);
exports.IsUniqueConstraint = IsUniqueConstraint;
// decorator function
function IsUnique(options, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: constants_1.ISUNIQUENAME,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: IsUniqueConstraint,
        });
    };
}
exports.IsUnique = IsUnique;
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
