export namespace com.gavdilabs.finalchallenge.service {
  export interface IEmployee {
    employeeID: string;
    employeeName: string;
    employeeSurname: string;
    allocations?: IAllocation[];
    city: string;
    phone: number;
    email: string;
    image: string;
    skills?: IEmployeeSkill[];
    projAllocEmps?: IProjAllocEmp[];
  }

  export interface ICustomer {
    customerID: string;
    customerName: string;
    image: string;
    phone: number;
    email: string;
    projects?: IProject[];
  }

  export interface IProject {
    projectID: string;
    customerID: string;
    customer?: ICustomer;
    allocations?: IAllocation[];
    name: string;
    startDate: Date;
    endDate: Date;
    phases?: IPhase[];
  }

  export interface IAllocation {
    allocationID: string;
    projectID: string;
    project?: IProject;
    phaseID: string;
    phase?: IPhase;
    employeeID: string;
    employee?: IEmployee;
    allocationName: string;
    allocationPercentage: number;
    startDate: Date;
    endDate: Date;
    firm: boolean;
    onsite: boolean;
    skills?: IAllocationSkill[];
  }

  export interface IPhase {
    phaseID: string;
    projectID: string;
    project?: IProject;
    phaseName: string;
    startDate: Date;
    endDate: Date;
    allocations?: IAllocation[];
  }

  export interface ISkill {
    skillID: string;
    skillNameID: string;
    skillLevelID: string;
    skillName?: ISkillName;
    skillLevel?: ISkillLevel;
  }

  export interface ISkillName {
    skillNameID: string;
    skillName: string;
  }

  export interface ISkillLevel {
    skillLevelID: string;
    skillLevelName: string;
  }

  export interface IEmployeeSkill {
    employeeSkillID: string;
    employeeID: string;
    skillID: string;
    employee?: IEmployee;
    skill?: ISkill;
  }

  export interface IAllocationSkill {
    allocationSkillID: string;
    allocationID: string;
    skillID: string;
    allocation?: IAllocation;
    skill?: ISkill;
  }

  export interface IProjAllocEmp {
    allocEmpID: string;
    allocationID: string;
    employeeID: string;
    allocation?: IAllocation;
    employee?: IEmployee;
  }

  export enum Entity {
    Employee = "com.gavdilabs.finalchallenge.service.Employee",
    Customer = "com.gavdilabs.finalchallenge.service.Customer",
    Project = "com.gavdilabs.finalchallenge.service.Project",
    Allocation = "com.gavdilabs.finalchallenge.service.Allocation",
    Phase = "com.gavdilabs.finalchallenge.service.Phase",
    Skill = "com.gavdilabs.finalchallenge.service.Skill",
    SkillName = "com.gavdilabs.finalchallenge.service.SkillName",
    SkillLevel = "com.gavdilabs.finalchallenge.service.SkillLevel",
    EmployeeSkill = "com.gavdilabs.finalchallenge.service.EmployeeSkill",
    AllocationSkill = "com.gavdilabs.finalchallenge.service.AllocationSkill",
    ProjAllocEmp = "com.gavdilabs.finalchallenge.service.ProjAllocEmp",
  }

  export enum SanitizedEntity {
    Employee = "Employee",
    Customer = "Customer",
    Project = "Project",
    Allocation = "Allocation",
    Phase = "Phase",
    Skill = "Skill",
    SkillName = "SkillName",
    SkillLevel = "SkillLevel",
    EmployeeSkill = "EmployeeSkill",
    AllocationSkill = "AllocationSkill",
    ProjAllocEmp = "ProjAllocEmp",
  }
}

export namespace FinalChallenge {
  export interface IEmployee {
    employeeID: string;
    employeeName: string;
    employeeSurname: string;
    allocations?: IAllocation[];
    city: string;
    phone: number;
    email: string;
    image: string;
    skills?: IEmployeeSkill[];
    projAllocEmps?: IProjAllocEmp[];
  }

  export interface ICustomer {
    customerID: string;
    customerName: string;
    image: string;
    phone: number;
    email: string;
    projects?: IProject[];
  }

  export interface IProject {
    projectID: string;
    customerID: string;
    customer?: ICustomer;
    allocations?: IAllocation[];
    name: string;
    startDate: Date;
    endDate: Date;
    phases?: IPhase[];
  }

  export interface IAllocation {
    allocationID: string;
    projectID: string;
    project?: IProject;
    phaseID: string;
    phase?: IPhase;
    employeeID: string;
    employee?: IEmployee;
    allocationName: string;
    allocationPercentage: number;
    startDate: Date;
    endDate: Date;
    firm: boolean;
    onsite: boolean;
    skills?: IAllocationSkill[];
  }

  export interface ISkillLevel {
    skillLevelID: string;
    skillLevelName: string;
  }

  export interface ISkillName {
    skillNameID: string;
    skillName: string;
  }

  export interface ISkill {
    skillID: string;
    skillNameID: string;
    skillLevelID: string;
    skillName?: ISkillName;
    skillLevel?: ISkillLevel;
  }

  export interface IEmployeeSkill {
    employeeSkillID: string;
    employeeID: string;
    skillID: string;
    employee?: IEmployee;
    skill?: ISkill;
  }

  export interface IAllocationSkill {
    allocationSkillID: string;
    allocationID: string;
    skillID: string;
    allocation?: IAllocation;
    skill?: ISkill;
  }

  export interface IPhase {
    phaseID: string;
    projectID: string;
    project?: IProject;
    phaseName: string;
    startDate: Date;
    endDate: Date;
    allocations?: IAllocation[];
  }

  export interface IProjAllocEmp {
    allocEmpID: string;
    allocationID: string;
    employeeID: string;
    allocation?: IAllocation;
    employee?: IEmployee;
  }

  export enum Entity {
    Employee = "FinalChallenge.Employee",
    Customer = "FinalChallenge.Customer",
    Project = "FinalChallenge.Project",
    Allocation = "FinalChallenge.Allocation",
    SkillLevel = "FinalChallenge.SkillLevel",
    SkillName = "FinalChallenge.SkillName",
    Skill = "FinalChallenge.Skill",
    EmployeeSkill = "FinalChallenge.EmployeeSkill",
    AllocationSkill = "FinalChallenge.AllocationSkill",
    Phase = "FinalChallenge.Phase",
    ProjAllocEmp = "FinalChallenge.ProjAllocEmp",
  }

  export enum SanitizedEntity {
    Employee = "Employee",
    Customer = "Customer",
    Project = "Project",
    Allocation = "Allocation",
    SkillLevel = "SkillLevel",
    SkillName = "SkillName",
    Skill = "Skill",
    EmployeeSkill = "EmployeeSkill",
    AllocationSkill = "AllocationSkill",
    Phase = "Phase",
    ProjAllocEmp = "ProjAllocEmp",
  }
}

export enum Entity {}

export enum SanitizedEntity {}
