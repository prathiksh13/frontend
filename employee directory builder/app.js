function formatEmployeeDirectory(input) {
  // Step 1: Split input into records
  const records = input.split(',');

  // Step 2: Process each record
  const employees = records.map(record => {
    const [namePart, rolePart] = record.split(':');

    const name = namePart.trim();
    const role = rolePart.trim().toLowerCase();

    // Capitalize first + last name
    const formattedName = name
      .split(' ')
      .filter(Boolean)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');

    const [firstName, lastName] = formattedName.split(' ');

    return { firstName, lastName, role };
  });

  // Step 3: Sort by last name
  employees.sort((a, b) => a.lastName.localeCompare(b.lastName));

  // Step 4: Build formatted lines
  const lines = employees.map(emp => `${emp.firstName} ${emp.lastName} - ${emp.role}`);

  // Step 5: Return with heading
  return `Employee Directory:\n${lines.join('\n')}`;
}
