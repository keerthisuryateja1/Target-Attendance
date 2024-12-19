document.getElementById('btn').addEventListener('click', calculateAttendance);
document.getElementById('reset-btn').addEventListener('click', resetForm);
document.getElementById('download-btn').addEventListener('click', downloadReport);

function calculateAttendance() {
  const presentClasses = parseInt(document.getElementById('present-input').value);
  const totalClasses = parseInt(document.getElementById('total-input').value);
  const requiredPercentage = parseInt(document.getElementById('percentage').value);

  if (isNaN(presentClasses) || isNaN(totalClasses) || presentClasses < 0 || totalClasses <= 0) {
    alert("Please enter valid numbers for classes attended and total classes.");
    return;
  }

  // Ensure that attendance percentage doesn't exceed 100%
  const attendancePercentage = Math.min((presentClasses / totalClasses) * 100, 100);
  const requiredClasses = Math.ceil((requiredPercentage / 100) * totalClasses);
  const missingClasses = requiredClasses - presentClasses;
  
  const resultDiv = document.getElementById('output-div');
  const missingDiv = document.getElementById('missing-classes-div');

  resultDiv.innerHTML = `Your current attendance: ${attendancePercentage.toFixed(2)}%`;

  if (attendancePercentage >= requiredPercentage) {
    resultDiv.style.color = 'green';
    resultDiv.innerHTML += `<br>You are above the required attendance!`;
  } else {
    resultDiv.style.color = 'red';
    resultDiv.innerHTML += `<br>You are below the required attendance.`;
    missingDiv.innerHTML = `You need to attend ${missingClasses} more classes to meet the required attendance.`;
  }

  missingDiv.style.display = 'block';
}

function resetForm() {
  document.getElementById('present-input').value = '';
  document.getElementById('total-input').value = '';
  document.getElementById('percentage').value = '75';
  document.getElementById('output-div').innerHTML = '';
  document.getElementById('missing-classes-div').innerHTML = '';
  document.getElementById('missing-classes-div').style.display = 'none';
}

function downloadReport() {
  const presentClasses = document.getElementById('present-input').value;
  const totalClasses = document.getElementById('total-input').value;
  const requiredPercentage = document.getElementById('percentage').value;
  const attendancePercentage = Math.min(((presentClasses / totalClasses) * 100).toFixed(2), 100);
  const reportContent = `
    Attendance Report:
    Classes Attended: ${presentClasses}
    Total Classes: ${totalClasses}
    Required Attendance: ${requiredPercentage}%
    Current Attendance: ${attendancePercentage}%
  `;

  const blob = new Blob([reportContent], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'attendance_report.txt';
  link.click();
}
