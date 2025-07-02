# Employee Schedule Widget

A Grist custom widget that displays employee schedules in a monthly calendar format, showing office hours, sick hours, and massage hours for each employee across all days of the month.

## Features

- **Monthly Calendar View**: Navigate between months with intuitive controls
- **Full Month Display**: Shows all days including weekends with visual distinction
- **Four Hour Types**: Displays office hours, sick hours, massage hours, and holiday hours for each employee
- **Configurable Data Sources**: Map columns from your Grist tables to the widget
- **Responsive Design**: Works well on both desktop and mobile devices
- **Sticky Headers**: Date column and employee names stay visible when scrolling

## Data Requirements

This widget expects data that combines employee information with schedule data. **Currently, the widget works with a single table only** due to Grist widget API limitations. You can configure which columns to use for each field through the widget's column mapping interface.

### Required Fields

1. **Employee Name**: The name of the employee (Text column)
2. **Date**: The date for the schedule entry (Date or DateTime column)
3. **Employee ID**: An identifier linking to the employee record (Numeric, Integer, or Text column)

### Optional Fields

4. **Office Hours**: Hours worked in the office (Numeric or Integer column)
5. **Sick Hours**: Hours of sick leave (Numeric or Integer column)
6. **Massage Hours**: Hours of massage therapy (Numeric or Integer column)
7. **Holiday Hours**: Hours of holiday/vacation time (Numeric or Integer column)

## Table Structure Examples

### Option 1: Combined Schedule Table
A single table containing all the information:

| Date       | Employee Name | Employee ID | Office Hours | Sick Hours | Massage Hours | Holiday Hours |
|------------|---------------|-------------|--------------|------------|---------------|---------------|
| 2024-01-15 | John Smith    | 1           | 8            | 0          | 0             | 0             |
| 2024-01-15 | Jane Doe      | 2           | 6            | 0          | 2             | 0             |
| 2024-01-16 | John Smith    | 1           | 0            | 8          | 0             | 0             |
| 2024-01-17 | Jane Doe      | 2           | 0            | 0          | 0             | 8             |

### Option 2: Linked Tables (with formula columns) - **Recommended**
- Employee table with ID and Name
- Schedule table with Employee ID (reference), Date, and hour columns
- **Create formula columns in the schedule table to pull employee names from the Employee table**
- This approach keeps your data normalized while providing all needed information in one table

## Setup Instructions

1. **Prepare Your Data**: Ensure you have a single table with all required information (see Data Requirements above).

2. **Add the Widget**: In your Grist document, add a custom widget and use the Employee Schedule widget URL.

3. **Select Your Data Table**: Choose the table containing your combined schedule and employee data.

4. **Map Columns**: In the widget configuration panel, map your table columns to the required fields:
   - Employee Name → Your employee name column
   - Date → Your date column  
   - Employee ID → Your employee identifier column
   - Office Hours → Your office hours column (optional)
   - Sick Hours → Your sick hours column (optional)
   - Massage Hours → Your massage hours column (optional)
   - Holiday Hours → Your holiday hours column (optional)

4. **Configure Access**: Ensure the widget has "Read Table" access to view your data.

## Deployment and Configuration

### Required Configuration Steps

To deploy this widget successfully with real Grist data, ensure the following steps are completed:

1. **Prepare and Normalize Data**:
   - Ensure a combined table exists with all employee schedule information OR configure separate Employee and Schedule tables with formula columns linking them.
   - Example configurations are provided above.

2. **Grist Widget API Integration**:
   - Ensure the widget is integrated within Grist and has access to necessary tables.
   - Set up connection to `grist-plugin-api.js` as shown in `index.html`.

3. **Enable Column Mappings**:
   - Map all required columns via Grist's widget configuration panel to match your data.

4. **Ensure Access Levels**:
   - Grant "Read Table" access permissions to the widget for it to function correctly.

5. **Complete JavaScript Integration** (in `page.js`):
   - Implement Grist record updates, additions, and deletions in the appropriate functions.
   - Refer to the commented TODOs to see where Grist interactions should be added.
   - **Important**: Currently implements client-side month filtering (lines 496-500). For large datasets, consider:
     - Server-side filtering using Grist table filters
     - Implementing data caching for previously viewed months
     - Using Grist API pagination if available

6. **Implement Optional Employee Table Lookup** (recommended for larger setups):
   - Set `dataSource` to `separate_tables` in widget options for modular designs.

7. **Test Setup Thoroughly**:
   - Thoroughly test in a development environment before deploying to production.
   - Ensure all user actions (add, update, remove) sync with Grist data accurately.

8. **Documentation and User Guidance**:
   - Update any internal documentation to instruct users on how to interact with the widget.

Make sure to follow these steps to ensure smooth deployment and operation within your Grist environment. If issues arise, refer to the "Troubleshooting" section for common solutions.

- **Navigate Months**: Use the left/right arrow buttons to navigate between months
- **Go to Current Month**: Click the "Today" button to jump to the current month
- **View Schedule**: The table shows all days for the selected month with each employee's hours
- **Weekend Identification**: Weekend days are highlighted with a different background color
- **Scroll**: Use horizontal scrolling to view more employees if needed

## Visual Design

- **Color Coding**: 
  - Office hours: Blue background with blue border
  - Sick hours: Red/pink background with red border  
  - Massage hours: Green background with green border
  - Holiday hours: Orange/yellow background with orange border
- **Sticky Positioning**: Date column remains visible when scrolling horizontally
- **Responsive Layout**: Adapts to different screen sizes

## Data Display

- Hours are displayed as numbers (e.g., "8", "4.5")
- Missing or zero values are hidden (show as empty)
- Each cell contains four columns for the different hour types (Office, Massage, Sick, Holiday)
- Employee names are shown in the table header

## Browser Compatibility

This widget works in all modern browsers that support:
- CSS Grid and Flexbox
- Vue.js 2.6+
- ES6 JavaScript features

## Troubleshooting

**"No data available" message**: 
- Ensure your table has data and required columns are mapped correctly
- Check that the widget has appropriate access permissions

**"No employees found" message**:
- Verify that your Employee Name column mapping is correct
- Ensure your data contains valid employee names

**Missing hours data**:
- Check that your date and employee ID columns are properly mapped
- Verify that dates are in the correct format (Date or DateTime columns)

**Layout issues**:
- Try refreshing the widget
- Check browser console for any JavaScript errors
