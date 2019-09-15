import { Room } from '../model/Room';
import {Report} from '../model/Report';

export interface ReportState {
    reports: Report[]
    data: any[]
    error?: string
}