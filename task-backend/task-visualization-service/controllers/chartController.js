// chartController.js
const taskController = require('../../task-service/controllers/taskController');

// Helper function to categorize tasks by status for pie chart
const getTasksStatusCounts = (tasks) => {
    const statusCounts = {
        completed: 0,
        in_progress: 0,
        pending: 0,
    };

    tasks.forEach(task => {
        if (task.status === 'completed') {
            statusCounts.completed += 1;
        } else if (task.status === 'in-progress') {
            statusCounts.in_progress += 1;
        } else if (task.status === 'pending') {
            statusCounts.pending += 1;
        } else {
            console.warn('Task without valid status:', task); // Log tasks with missing status
        }
    });

    return statusCounts;
};

// Controller function to handle chart data requests
exports.getChartData = async (req, res) => {
    const chartType = req.query.type || 'pie';

    try {
        // Use the internal function to fetch tasks
        const tasks = await taskController.getTasksInternal();

        if (!tasks || !Array.isArray(tasks)) {
            return res.status(500).json({ error: 'Invalid tasks data' });
        }

        let chartData;
        switch (chartType) {
            case 'pie':
                chartData = getTasksStatusCounts(tasks);
                break;
            default:
                return res.status(400).json({ error: 'Invalid Chart Type' });
        }

        res.json(chartData);
    } catch (err) {
        console.error('Error while fetching tasks:', err);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};
