import type { ProjectDetails } from '../types/project';

interface ErrorLogEmail {
  timestamp: string;
  projectId: string;
  projectName: string;
  errorType: string;
  details: Record<string, any>;
}

export const sendErrorLog = async (error: ErrorLogEmail) => {
  try {
    // In a production environment, this would be an API call
    // For now, we'll simulate the email sending
    console.log('Sending error log email:', {
      to: 'errorlogs@buildwellai.com',
      subject: `Error Log: ${error.errorType} - Project ${error.projectId}`,
      body: `
Error Log Details:
-----------------
Timestamp: ${error.timestamp}
Project ID: ${error.projectId}
Project Name: ${error.projectName}
Error Type: ${error.errorType}

Details:
${JSON.stringify(error.details, null, 2)}
      `
    });
  } catch (err) {
    console.error('Failed to send error log:', err);
  }
};

export const logInsuranceError = (project: ProjectDetails) => {
  const primaryTotal = project.insurance.primary.reduce((sum, ins) => sum + ins.percentage, 0);
  const secondaryTotal = project.insurance.secondary.reduce((sum, ins) => sum + ins.percentage, 0);

  const errorLog: ErrorLogEmail = {
    timestamp: new Date().toISOString(),
    projectId: project.id,
    projectName: project.name,
    errorType: 'Insurance Layer Validation',
    details: {
      primaryLayer: {
        total: primaryTotal,
        expected: 100,
        insurers: project.insurance.primary
      },
      secondaryLayer: {
        total: secondaryTotal,
        expected: 100,
        insurers: project.insurance.secondary
      }
    }
  };

  return sendErrorLog(errorLog);
};