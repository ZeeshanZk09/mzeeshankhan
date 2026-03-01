type PasswordStrength = {
  score: number;
  label: 'Weak' | 'Medium' | 'Strong';
  color: 'text-red-500' | 'text-orange-500' | 'text-green-500';
};

export function checkPasswordStrength(password: string): PasswordStrength {
  let score = 0;

  // Conditions
  const lengthCheck = password.length >= 8;
  const upperCheck = /[A-Z]/.test(password);
  const lowerCheck = /[a-z]/.test(password);
  const numberCheck = /\d/.test(password);
  const specialCharCheck = /[@$!%*?&]/.test(password);

  // Count fulfilled conditions
  if (lengthCheck) score++;
  if (upperCheck) score++;
  if (lowerCheck) score++;
  if (numberCheck) score++;
  if (specialCharCheck) score++;

  // Determine label and color
  if (score <= 2) {
    return { score, label: 'Weak', color: 'text-red-500' };
  } else if (score === 3 || score === 4) {
    return { score, label: 'Medium', color: 'text-orange-500' };
  } else {
    return { score, label: 'Strong', color: 'text-green-500' };
  }
}
