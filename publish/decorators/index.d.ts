import { IsUniqeInterface } from "../interfaces";
import { ValidationOptions } from "class-validator";
import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { EntityManager } from 'typeorm';
export declare class IsUniqueConstraint implements ValidatorConstraintInterface {
    private readonly entityManager;
    constructor(entityManager: EntityManager);
    validate(value: any, args?: ValidationArguments): Promise<boolean>;
    defaultMessage(validationArguments: ValidationArguments): string;
}
export declare function IsUnique(options: IsUniqeInterface, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
