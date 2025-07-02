// Demo version with sample data
let app;

// Copy utility functions from page.js
function getAllDaysInMonth(year, month) {
  const allDays = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    allDays.push({
      date: new Date(date),
      dateString: formatDateString(date),
      dateLabel: formatDateLabel(date),
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(),
      isWeekend: isWeekend
    });
  }
  
  return allDays;
}

function formatDateString(date) {
  return date.toISOString().split('T')[0];
}

function formatDateLabel(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function formatMonthTitle(year, month) {
  const date = new Date(year, month, 1);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });
}

// Generate sample data
function generateSampleData() {
  const employees = [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Mike Johnson' },
    { id: 4, name: 'Sarah Wilson' },
    { id: 5, name: 'David Brown' }
  ];

  const scheduleData = new Map();
  const currentDate = new Date();
  const allDays = getAllDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  // Generate sample schedule for current month (skip weekends for data generation)
  allDays.filter(day => !day.isWeekend).forEach(day => {
    employees.forEach(employee => {
      const key = `${day.dateString}-${employee.id}`;
      
      // Generate random but realistic schedule data
      const isPresent = Math.random() > 0.1; // 90% attendance rate
      let officeHours = 0;
      let sickHours = 0;
      let massageHours = 0;
      let holidayHours = 0;

      if (isPresent) {
        if (Math.random() < 0.03) { // 3% holiday days
          holidayHours = 8;
        } else if (Math.random() < 0.05) { // 5% sick days
          sickHours = 8;
        } else {
          officeHours = Math.random() < 0.2 ? 
            Math.floor(Math.random() * 4) + 4 : // Part time 20%
            8; // Full time 80%
          
          // Sometimes massage therapy
          if (Math.random() < 0.15 && officeHours >= 6) { // 15% chance
            massageHours = Math.random() < 0.5 ? 1 : 2;
            officeHours -= massageHours;
          }
        }
      }

      scheduleData.set(key, {
        date: day.dateString,
        employeeId: employee.id,
        officeHours,
        sickHours,
        massageHours,
        holidayHours
      });
    });
  });

  return { employees, scheduleData };
}

// Initialize Vue app with sample data
document.addEventListener('DOMContentLoaded', function() {
  const sampleData = generateSampleData();
  
  app = new Vue({
    el: '#app',
    data: {
      currentDate: new Date(),
      employees: sampleData.employees,
      scheduleData: sampleData.scheduleData,
      allDays: [],
      showModal: false,
      showRemoveModal: false,
      employeeToRemove: null,
      newEmployee: {
        name: '',
        id: null,
        selectedId: ''
      },
      // This would come from Grist widget configuration or API call
      allEmployeesLookup: [
        { id: 1, name: 'John Smith' },
        { id: 2, name: 'Jane Doe' },
        { id: 3, name: 'Mike Johnson' },
        { id: 4, name: 'Sarah Wilson' },
        { id: 5, name: 'David Brown' },
        { id: 6, name: 'Alice Cooper' },
        { id: 7, name: 'Bob Martinez' },
        { id: 8, name: 'Carol White' },
        { id: 9, name: 'Dan Lee' },
        { id: 10, name: 'Eva Green' }
      ]
    },
    computed: {
      monthTitle() {
        return formatMonthTitle(this.currentDate.getFullYear(), this.currentDate.getMonth());
      },
      
      availableEmployees() {
        // Filter out employees who already have schedules for this month
        const currentEmployeeIds = new Set(this.employees.map(e => e.id));
        return this.allEmployeesLookup.filter(emp => !currentEmployeeIds.has(emp.id));
      },
      
      canAddEmployee() {
        if (this.newEmployee.selectedId === 'new') {
          return this.newEmployee.name && this.newEmployee.name.trim();
        }
        return this.newEmployee.selectedId && this.newEmployee.selectedId !== '';
      }
    },
    methods: {
      previousMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
        this.updateAllDays();
        this.regenerateDataForMonth();
      },
      
      nextMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
        this.updateAllDays();
        this.regenerateDataForMonth();
      },
      
      goToCurrentMonth() {
        this.currentDate = new Date();
        this.updateAllDays();
        this.regenerateDataForMonth();
      },
      
      updateAllDays() {
        this.allDays = getAllDaysInMonth(
          this.currentDate.getFullYear(), 
          this.currentDate.getMonth()
        );
      },
      
      regenerateDataForMonth() {
        // Generate new sample data for the new month
        const scheduleData = new Map();
        
        this.allDays.filter(day => !day.isWeekend).forEach(day => {
          this.employees.forEach(employee => {
            const key = `${day.dateString}-${employee.id}`;
            
            const isPresent = Math.random() > 0.1;
            let officeHours = 0;
            let sickHours = 0;
            let massageHours = 0;
            let holidayHours = 0;

            if (isPresent) {
              if (Math.random() < 0.03) { // 3% holiday days
                holidayHours = 8;
              } else if (Math.random() < 0.05) {
                sickHours = 8;
              } else {
                officeHours = Math.random() < 0.2 ? 
                  Math.floor(Math.random() * 4) + 4 :
                  8;
                
                if (Math.random() < 0.15 && officeHours >= 6) {
                  massageHours = Math.random() < 0.5 ? 1 : 2;
                  officeHours -= massageHours;
                }
              }
            }

            scheduleData.set(key, {
              date: day.dateString,
              employeeId: employee.id,
              officeHours,
              sickHours,
              massageHours,
              holidayHours
            });
          });
        });
        
        this.scheduleData = scheduleData;
      },
      
      getHours(dateString, employeeId, type) {
        const key = `${dateString}-${employeeId}`;
        const schedule = this.scheduleData.get(key);
        
        if (!schedule) {
          return '';
        }
        
        let value;
        switch (type) {
          case 'office':
            value = schedule.officeHours;
            break;
          case 'sick':
            value = schedule.sickHours;
            break;
          case 'massage':
            value = schedule.massageHours;
            break;
          case 'holiday':
            value = schedule.holidayHours;
            break;
          default:
            return '';
        }
        
        // Don't display zero values, only display actual positive numbers
        return value && value > 0 ? value.toString() : '';
      },
      
      updateHours(dateString, employeeId, type, value) {
        const key = `${dateString}-${employeeId}`;
        let schedule = this.scheduleData.get(key);
        
        // Create schedule entry if it doesn't exist
        if (!schedule) {
          schedule = {
            date: dateString,
            employeeId: employeeId,
            officeHours: 0,
            sickHours: 0,
            massageHours: 0,
            holidayHours: 0
          };
          this.scheduleData.set(key, schedule);
        }
        
        // Update the specific hour type (ensure no negative values)
        const numValue = Math.max(0, parseFloat(value) || 0);
        switch (type) {
          case 'office':
            schedule.officeHours = numValue;
            break;
          case 'sick':
            schedule.sickHours = numValue;
            break;
          case 'massage':
            schedule.massageHours = numValue;
            break;
          case 'holiday':
            schedule.holidayHours = numValue;
            break;
        }
        
        // Force Vue to react to the change
        this.$forceUpdate();
        
        // Log the change for demo purposes
        console.log('Updated hours:', {
          date: dateString,
          employeeId: employeeId,
          type: type,
          value: numValue
        });
      },
      
      showAddEmployeeModal() {
        this.showModal = true;
        this.newEmployee.name = '';
        this.newEmployee.id = null;
        this.newEmployee.selectedId = '';
      },
      
      closeModal() {
        this.showModal = false;
        this.newEmployee.name = '';
        this.newEmployee.id = null;
        this.newEmployee.selectedId = '';
      },
      
      onEmployeeSelected() {
        if (this.newEmployee.selectedId && this.newEmployee.selectedId !== 'new') {
          const selectedEmployee = this.allEmployeesLookup.find(emp => emp.id == this.newEmployee.selectedId);
          if (selectedEmployee) {
            this.newEmployee.name = selectedEmployee.name;
            this.newEmployee.id = selectedEmployee.id;
          }
        } else {
          this.newEmployee.name = '';
          this.newEmployee.id = null;
        }
      },
      
      addEmployeeSchedule() {
        if (!this.canAddEmployee) {
          return;
        }
        
        let employeeId, employeeName;
        
        if (this.newEmployee.selectedId === 'new') {
          // Creating a new employee
          if (!this.newEmployee.name.trim()) {
            return;
          }
          employeeName = this.newEmployee.name.trim();
          employeeId = this.newEmployee.id || (Math.max(...this.allEmployeesLookup.map(e => e.id), 0) + 1);
        } else {
          // Using existing employee from lookup
          const selectedEmployee = this.allEmployeesLookup.find(emp => emp.id == this.newEmployee.selectedId);
          if (!selectedEmployee) {
            return;
          }
          employeeId = selectedEmployee.id;
          employeeName = selectedEmployee.name;
        }
        
        // Add employee to the current month's employee list
        const newEmployee = {
          id: employeeId,
          name: employeeName
        };
        
        // Check if employee already exists in current view
        if (!this.employees.find(e => e.id === employeeId)) {
          this.employees.push(newEmployee);
        }
        
        // Create initial schedule entry for the first day of the current month
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const firstDayString = formatDateString(firstDay);
        const key = `${firstDayString}-${employeeId}`;
        
        // Create schedule entry with all zeros
        this.scheduleData.set(key, {
          date: firstDayString,
          employeeId: employeeId,
          officeHours: 0,
          sickHours: 0,
          massageHours: 0,
          holidayHours: 0
        });
        
        // Force Vue to react to the changes
        this.$forceUpdate();
        
        // Close modal
        this.closeModal();
        
        // Log for demo purposes
        console.log('Added employee schedule:', {
          employee: newEmployee,
          initialDate: firstDayString
        });
      },
      
      confirmRemoveEmployee(employee) {
        this.employeeToRemove = employee;
        this.showRemoveModal = true;
      },
      
      closeRemoveModal() {
        this.showRemoveModal = false;
        this.employeeToRemove = null;
      },
      
      removeEmployee() {
        if (!this.employeeToRemove) {
          return;
        }
        
        const employeeId = this.employeeToRemove.id;
        
        // Remove all schedule entries for this employee in the current month
        const keysToRemove = [];
        for (const [key, schedule] of this.scheduleData.entries()) {
          if (schedule.employeeId === employeeId && 
              key.startsWith(this.currentDate.getFullYear() + '-' + 
                             String(this.currentDate.getMonth() + 1).padStart(2, '0'))) {
            keysToRemove.push(key);
          }
        }
        
        keysToRemove.forEach(key => this.scheduleData.delete(key));
        
        // Remove employee from current month's employee list
        const employeeIndex = this.employees.findIndex(e => e.id === employeeId);
        if (employeeIndex > -1) {
          this.employees.splice(employeeIndex, 1);
        }
        
        // Force Vue to react to the changes
        this.$forceUpdate();
        
        // Log for demo purposes
        console.log('Removed employee schedule:', {
          employee: this.employeeToRemove,
          month: this.monthTitle,
          entriesRemoved: keysToRemove.length
        });
        
        // Close modal
        this.closeRemoveModal();
      }
    },
    
    created() {
      this.updateAllDays();
    }
  });
});
