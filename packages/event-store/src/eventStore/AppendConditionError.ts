import { AppendCondition } from "./EventStore"

export class AppendConditionError extends Error {
    public readonly appendCondition: AppendCondition

    constructor(appendCondition: AppendCondition) {
        super("Expected Version fail: New events matching appendCondition found.")
        this.name = "AppendConditionError"
        this.appendCondition = appendCondition
        Object.setPrototypeOf(this, AppendConditionError.prototype)
    }
}
