//namespace FinalChallengeModel;
namespace com.gavdilabs.finalchallenge.service;

entity Employee {
    key employeeID : UUID;
    employeeName: String(128);
    employeeSurname: String(128);
    allocations: Association to many Allocation on allocations.employeeID = employeeID;
    city:  String(128);
    phone: Integer;
    email:  String(128);
    image:  String(1111);
    skills: Association to many EmployeeSkill on skills.employeeID = employeeID;
    projAllocEmps: Association to many ProjAllocEmp on projAllocEmps.employeeID = employeeID;

}

entity Customer {
    key customerID : UUID;
    customerName: String(128);
    image:  String(1111);
    phone: Integer;
    email:  String(128);   
    projects: Association to many Project on projects.customerID = customerID
}

entity Project {
    key projectID : UUID;
    customerID: String(1111);
    customer: Association to Customer on customer.customerID = customerID;
    allocations: Association to many Allocation on allocations.projectID = projectID;
    name:  String(1111);
    startDate: Date;
    endDate:  Date;   
    phases: Association to many Phase on phases.projectID = projectID;
}


entity Allocation {
    key allocationID : UUID;
    projectID:  String(128);
    project: Association to Project on project.projectID = projectID;
    phaseID:  String(128);
    phase:Association to Phase on phase.phaseID = phaseID;
    employeeID: String(128);
    employee: Association to Employee on employee.employeeID = employeeID;
    allocationName: String(128);
    allocationPercentage: Integer;
    startDate: Date;
    endDate:  Date; 
    firm: Boolean;
    onsite: Boolean;
    skills: Association to many AllocationSkill on skills.allocationID = allocationID;
}

entity Phase {
    key phaseID: UUID;
    projectID:  String(128);
    project: Association to Project on project.projectID = projectID;
    phaseName:  String(128);
    startDate: Date;
    endDate: Date;
    allocations: Association to many Allocation on allocations.phaseID = phaseID;
}

entity Skill {
    key skillID: UUID;
    skillNameID: String(128);
    skillLevelID: String(128);
    skillName: Association to SkillName on skillName.skillNameID = skillNameID;
    skillLevel: Association to SkillLevel on skillLevel.skillLevelID = skillLevelID;
}

entity SkillName { 
    key skillNameID: UUID;
    skillName: String(128);
}

entity SkillLevel{
    key skillLevelID: UUID;
    skillLevelName: String(128);
}

entity EmployeeSkill{
    key employeeSkillID: UUID;
    employeeID: String(128);
    skillID: String(128);
    employee: Association to Employee on employee.employeeID = employeeID;
    skill: Association to Skill on skill.skillID = skillID;
}

entity AllocationSkill{
    key allocationSkillID: UUID;
    allocationID: String(128);
    skillID: String(128);
    allocation: Association to Allocation on allocation.allocationID = allocationID;
    skill: Association to Skill on skill.skillID = skillID;
}

entity ProjAllocEmp{
    key allocEmpID:UUID;
    allocationID: String(128);
    employeeID: String(128);
    allocation: Association to Allocation on allocation.allocationID = allocationID;
    employee: Association to Employee on employee.employeeID = employeeID;
}