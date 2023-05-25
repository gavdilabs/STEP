using { com.gavdilabs.finalchallenge.service as model } from '../db/finalchallenge-dm';

service FinalChallenge {
    entity Employee as projection on model.Employee;
    entity Customer as projection on model.Customer;
    entity Project as projection on model.Project;
    entity Allocation as projection on model.Allocation;
    entity SkillLevel as projection on model.SkillLevel
    entity SkillName as projection on model.SkillName
    entity Skill as projection on model.Skill
    entity EmployeeSkill as projection on model.EmployeeSkill
    entity AllocationSkill as projection on model.AllocationSkill
    entity Phase as projection on model.Phase
    entity ProjAllocEmp as projection on model.ProjAllocEmp
};