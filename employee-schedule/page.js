// Employee Schedule Widget - Main Logic

// Global variables
let app;

// Utility function to ensure DOM is ready
function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// Date utility functions
function getMonthDateRange(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0, 23, 59, 59);
  return { firstDay, lastDay };
}

function isDateInMonth(date, year, month) {
  const testDate = new Date(date);
  return testDate.getFullYear() === year && testDate.getMonth() === month;
}

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

// Data processing functions
function processEmployeeData(records) {
  const employees = [];
  const employeeMap = new Map();
  
  records.forEach(record => {
    const mappedRecord = grist.mapColumnNames(record);
    if (mappedRecord && mappedRecord.employeeName) {
      const employeeId = record.id;
      const employeeName = mappedRecord.employeeName;
      
      if (!employeeMap.has(employeeId)) {
        employeeMap.set(employeeId, {
          id: employeeId,
          name: employeeName
        });
        employees.push(employeeMap.get(employeeId));
      }
    }
  });
  
  return employees.sort((a, b) => a.name.localeCompare(b.name));
}

function processScheduleData(records) {
  const scheduleMap = new Map();
  
  records.forEach(record => {
    const mappedRecord = grist.mapColumnNames(record);
    if (mappedRecord && mappedRecord.date && mappedRecord.employeeId) {
      const dateString = mappedRecord.date instanceof Date ? 
        formatDateString(mappedRecord.date) : 
        mappedRecord.date;
      
      const key = `${dateString}-${mappedRecord.employeeId}`;
      scheduleMap.set(key, {
        date: dateString,
        employeeId: mappedRecord.employeeId,
        officeHours: mappedRecord.officeHours || 0,
        sickHours: mappedRecord.sickHours || 0,
        massageHours: mappedRecord.massageHours || 0
      });
    }
  });
  
  return scheduleMap;
}

// Grist column configuration options
function getGristOptions() {
  return [
    {
      name: "employeeName",
      title: "Employee Name",
      optional: false,
      type: "Text",
      description: "Name of the employee",
      allowMultiple: false
    },
    {
      name: "date",
      title: "Date",
      optional: false,
      type: "Date,DateTime",
      description: "Date for the schedule entry",
      allowMultiple: false,
      strictType: true
    },
    {
      name: "employeeId",
      title: "Employee ID",
      optional: false,
      type: "Int,Numeric,Text",
      description: "ID linking to employee record",
      allowMultiple: false
    },
    {
      name: "officeHours",
      title: "Office Hours",
      optional: true,
      type: "Numeric,Int",
      description: "Hours worked in office",
      allowMultiple: false,
      strictType: true
    },
    {
      name: "sickHours",
      title: "Sick Hours", 
      optional: true,
      type: "Numeric,Int",
      description: "Hours of sick leave",
      allowMultiple: false,
      strictType: true
    },
    {
      name: "massageHours",
      title: "Massage Hours",
      optional: true,
      type: "Numeric,Int", 
      description: "Hours of massage therapy",
      allowMultiple: false,
      strictType: true
    }
  ];
}

// Error handling
function handleError(err) {
  console.error('ERROR', err);
  if (app) {
    app.status = String(err).replace(/^Error: /, '');
  }
}

// Vue.js application
ready(function() {
  // Initialize Vue app
  app = new Vue({
    el: '#app',
    data: {
      status: 'Loading...',
      currentDate: new Date(),
      employees: [],
      scheduleData: new Map(),
      allDays: [],
      currentOptions: {},
      showModal: false,
      showRemoveModal: false,
      employeeToRemove: null,
      newEmployee: {
        name: '',
        id: null
      }
    },
    computed: {
      monthTitle() {
        return formatMonthTitle(this.currentDate.getFullYear(), this.currentDate.getMonth());
      },
      
      isUsingScheduleTable() {
        return this.currentOptions.dataSource === 'separate_tables' && 
               this.currentOptions.scheduleTable;
      },
      
      isUsingEmployeeTable() {
        return this.currentOptions.dataSource === 'separate_tables' &&
               this.currentOptions.employeeTable;
      },
      
      canAddEmployee() {
        return this.newEmployee.name && this.newEmployee.name.trim();
      }
    },
    methods: {
      previousMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
        this.updateAllDays();
        this.refreshDataForCurrentMonth();
      },
      
      nextMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
        this.updateAllDays();
        this.refreshDataForCurrentMonth();
      },
      
      goToCurrentMonth() {
        this.currentDate = new Date();
        this.updateAllDays();
        this.refreshDataForCurrentMonth();
      },
      
      updateAllDays() {
        this.allDays = getAllDaysInMonth(
          this.currentDate.getFullYear(), 
          this.currentDate.getMonth()
        );
      },
      
      refreshDataForCurrentMonth() {
        // Force Grist to reload records which will trigger the month filter
        // TODO: In a real implementation, you could optimize by requesting
        // only records for the current month using Grist table filters
        console.log('Refreshing data for month:', this.monthTitle);
        
        // For now, we'll rely on the client-side filtering in onRecords
        // In a production implementation, you might want to:
        // 1. Use Grist table filters to only fetch current month records
        // 2. Implement server-side filtering if supported by Grist API
        // 3. Cache previous months' data locally to avoid re-fetching
        
        // Clear current data to show loading state
        this.employees = [];
        this.scheduleData = new Map();
        this.status = 'Loading month data...';
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
      },
      
      saveChanges(dateString, employeeId) {
        // This method will be called when user finishes editing a cell
        // In a real Grist widget, this would save changes back to Grist
        const key = `${dateString}-${employeeId}`;
        const schedule = this.scheduleData.get(key);
        
        if (schedule) {
          console.log('Saving changes for:', {
            date: dateString,
            employeeId: employeeId,
            schedule: schedule
          });
          
          // TODO: Implement Grist record update
          // grist.docApi.applyUserActions([['UpdateRecord', tableName, recordId, {
          //   officeHours: schedule.officeHours,
          //   sickHours: schedule.sickHours,
          //   massageHours: schedule.massageHours,
          //   holidayHours: schedule.holidayHours
          // }]]);
        }
      },
      
      showAddEmployeeModal() {
        this.showModal = true;
        this.newEmployee.name = '';
        this.newEmployee.id = null;
      },
      
      closeModal() {
        this.showModal = false;
        this.newEmployee.name = '';
        this.newEmployee.id = null;
      },
      
      addEmployeeSchedule() {
        if (!this.canAddEmployee) {
          return;
        }
        
        // Generate employee ID if not provided
        const employeeId = this.newEmployee.id || (Math.max(...this.employees.map(e => e.id), 0) + 1);
        
        // Add employee to the list
        const newEmployee = {
          id: employeeId,
          name: this.newEmployee.name.trim()
        };
        
        // Check if employee already exists
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
        
        // TODO: Implement Grist record creation
        // grist.docApi.applyUserActions([['AddRecord', tableName, null, {
        //   date: firstDayString,
        //   employeeId: employeeId,
        //   employeeName: newEmployee.name,
        //   officeHours: 0,
        //   sickHours: 0,
        //   massageHours: 0,
        //   holidayHours: 0
        // }]]);
        
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
        
        // TODO: Implement Grist record deletion
        // const recordsToDelete = []; // Get record IDs for this employee in current month
        // grist.docApi.applyUserActions(recordsToDelete.map(recordId => 
        //   ['RemoveRecord', tableName, recordId]
        // ));
        
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

  // Grist event handlers
  function onRecords(records, mappings) {
    try {
      if (!records || records.length === 0) {
        app.status = 'No data available. Please ensure your table has the required columns mapped.';
        return;
      }

      // Filter records for the current month
      const currentMonthRecords = records.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate.getFullYear() === app.currentDate.getFullYear() &&
               recordDate.getMonth() === app.currentDate.getMonth();
      });

      // Process employee data (from first table)
      app.employees = processEmployeeData(currentMonthRecords);
      
      // Process schedule data (this would come from the schedule table)
      app.scheduleData = processScheduleData(currentMonthRecords);
      
      // Clear status if we have data
      if (app.employees.length > 0) {
        app.status = '';
      } else {
        app.status = 'No employees found. Please check your employee table configuration.';
      }
      
    } catch (err) {
      handleError(err);
    }
  }

  function onRecord(record, mappings) {
    // Handle single record selection if needed
    // For now, we'll just use the onRecords handler
  }

  function onOptions(options, settings) {
    // Handle widget options changes
    app.currentOptions = options || {};
    
    // Check if user is trying to use separate tables mode
    if (options && options.dataSource === 'separate_tables') {
      app.status = 'Separate tables mode is not fully supported by Grist widget API yet. Please use single table mode with all data combined.';
      console.log('Separate tables mode attempted:', {
        employeeTable: options.employeeTable,
        scheduleTable: options.scheduleTable
      });
      return;
    }
    
    // Log current configuration for debugging
    console.log('Widget options updated:', options);
  }

  // Configure Grist widget
  try {
    // Set up column mappings
    const columnOptions = getGristOptions();
    
    // Initialize Grist connection
    const { firstDay, lastDay } = getMonthDateRange(app.currentDate.getFullYear(), app.currentDate.getMonth());

    grist.ready({
      requiredAccess: 'read_table',
      columns: columnOptions,
      allowSelectBy: true
    });

    // Apply server-side filters to optimize data loading
    grist.onRecords(onRecords);
    grist.onRecord(onRecord);
    grist.onOptions(onOptions);

    // Setting filters for the Grist API to only return current month's data
    grist.onRecordSelection(currentView => {
      // Assuming the date column is mapped as "date"
      grist.setTableFilters(currentView.tableId, 'date', {
        min: formatDateString(firstDay),
        max: formatDateString(lastDay)
      });
    });

    // Configure error handling for Vue
    Vue.config.errorHandler = handleError;
    
  } catch (err) {
    handleError(err);
  }
});
