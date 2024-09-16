import { Model } from "@sequelize/core"
import _ from "lodash"

export class PatchService {
    static async patch<T extends Model>(
        instance: T,
        patchData: Partial<T['_attributes']>
    ): Promise<undefined> {
        const currentData = instance.get()

        const updatedData = this.deepMerge(currentData, patchData)
        
        await instance.update(updatedData)
        await instance.save()
    }

    private static deepMerge(target: any, source: any): any {
        if (_.isArray(target) && _.isArray(source)) {
            return [...target, ...source];
        } 
        if (_.isObject(target) && _.isObject(source)) {
            return _.mergeWith({}, target, source, (objValue, srcValue) => {
                if (srcValue === undefined) {
                    return objValue;
                }
                if (_.isArray(objValue)) {
                    return srcValue;
                }
            });
        }
        return source !== undefined ? source : target;
    }
}