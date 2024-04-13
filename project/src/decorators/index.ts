import { ISUNIQUECONSTRANTNAME, ISUNIQUENAME } from "../constants"
import { IsUniqeInterface } from "../interfaces"
import { ValidationOptions, registerDecorator } from "class-validator";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common'
import { EntityManager, Not } from 'typeorm'
import { InjectEntityManager } from "@nestjs/typeorm";

@ValidatorConstraint({ name: ISUNIQUECONSTRANTNAME, async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager
    ) { }
    async validate(value: any, args?: ValidationArguments): Promise<boolean> {
        const [options] = args?.constraints as string[]
        const { table, column, updateId } = options as unknown as IsUniqeInterface
        const colName = column ?? args.property
        const dataExist = await this.entityManager
            .getRepository(table)
            .createQueryBuilder(table)
            .where({ [colName]: value })
        if (updateId) {
            const id = args?.object[updateId]
            if (id) {
                dataExist.andWhere({ [updateId]: Not(id) })
            }
        }
        return !(await dataExist.getExists())
    }

    defaultMessage(validationArguments: ValidationArguments): string {
        const field = validationArguments.property
        return `${capitalizeFirstLetter(field)} already exist.`
    }
}


// decorator function
export function IsUnique(options: IsUniqeInterface, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: ISUNIQUENAME,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: IsUniqueConstraint,
        })
    }
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}