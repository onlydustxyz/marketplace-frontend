export enum ProjectCreationSteps {
  ORGANIZATIONS = "ORGANIZATIONS",
  REPOSITORIES = "REPOSITORIES",
  INFORMATIONS = "INFORMATIONS"
}
export const ProjectCreationStepsNumber : {[key in ProjectCreationSteps]: number} ={
  [ProjectCreationSteps.ORGANIZATIONS]: 1,
  [ProjectCreationSteps.REPOSITORIES]: 2,
  [ProjectCreationSteps.INFORMATIONS]: 3,
}

export const ProjectCreationStepsNext : {[key in ProjectCreationSteps]: ProjectCreationSteps} ={
  [ProjectCreationSteps.ORGANIZATIONS]: ProjectCreationSteps.REPOSITORIES,
  [ProjectCreationSteps.REPOSITORIES]: ProjectCreationSteps.INFORMATIONS,
  [ProjectCreationSteps.INFORMATIONS]: ProjectCreationSteps.INFORMATIONS,
}

export const ProjectCreationStepsPrev : {[key in ProjectCreationSteps]: ProjectCreationSteps} ={
  [ProjectCreationSteps.ORGANIZATIONS]: ProjectCreationSteps.ORGANIZATIONS,
  [ProjectCreationSteps.REPOSITORIES]: ProjectCreationSteps.ORGANIZATIONS,
  [ProjectCreationSteps.INFORMATIONS]: ProjectCreationSteps.REPOSITORIES,
}
