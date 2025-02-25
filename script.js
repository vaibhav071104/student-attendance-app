document.addEventListener('DOMContentLoaded', () => {
    const uploadBtn = document.getElementById('upload-btn');
    const excelUpload = document.getElementById('excel-upload');
    const studentList = document.getElementById('student-list');
    const monthSelect = document.getElementById('month-select');
    const dateSelect = document.getElementById('date-select');

    uploadBtn.addEventListener('click', () => {
        excelUpload.click();
    });

    excelUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            // Here you would typically send the file to a server to process
            // For this example, we'll just simulate loading some student data
            loadStudentData();
        }
    });

    function loadStudentData() {
        // This is a mock function to simulate loading student data
        const mockStudents = [
            'John Doe',
            'Jane Smith',
            'Alice Johnson',
            'Bob Williams',
            'Charlie Brown'
        ];

        studentList.innerHTML = '';
        mockStudents.forEach(student => {
            const studentItem = document.createElement('div');
            studentItem.className = 'student-item';
            studentItem.innerHTML = `
                <span class="student-name">${student}</span>
                <div class="attendance-slider">
                    <span class="attendance-option" data-status="present">Present</span>
                    <span class="attendance-option" data-status="absent">Absent</span>
                    <span class="attendance-option" data-status="na">N/A</span>
                </div>
            `;
            studentList.appendChild(studentItem);
        });

        // Add event listeners to attendance options
        document.querySelectorAll('.attendance-option').forEach(option => {
            option.addEventListener('click', function() {
                const slider = this.parentElement;
                slider.querySelectorAll('.attendance-option').forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Set the current month and date
    const now = new Date();
    monthSelect.value = now.getMonth() + 1;
    dateSelect.value = now.toISOString().split('T')[0];

    // Add event listeners for month and date changes
    monthSelect.addEventListener('change', updateAttendance);
    dateSelect.addEventListener('change', updateAttendance);

    function updateAttendance() {
        // This function would typically update the attendance data based on the selected date
        console.log(`Updating attendance for ${monthSelect.value}/${dateSelect.value}`);
    }
});

