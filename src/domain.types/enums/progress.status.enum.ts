export enum ProgressStatus {
    Pending = 'Pending',
    InProgress = 'InProgress',
    Completed = 'Completed',
    Cancelled = 'Cancelled',
    Delayed = 'Delayed',
    Unknown = 'Unknown',
}

export const ProgressStatusList: ProgressStatus[] = [
    ProgressStatus.Pending,
    ProgressStatus.InProgress,
    ProgressStatus.Completed,
    ProgressStatus.Cancelled,
    ProgressStatus.Delayed,
    ProgressStatus.Unknown,
];
