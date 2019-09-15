import { Skill } from '../model/Skill';

export interface SkillState {
    skills: Skill[];
    searchTerm?: string;
    selectedSkill: Skill;
    newSkillTitle: string;
    error?: string;
    filter: string;
}