script.js
document.addEventListener('DOMContentLoaded', () => {
    const safetyLevelSlider = document.getElementById('safety-level');
    const safetyLevelValue = document.getElementById('safety-level-value');
    const taskComplexitySlider = document.getElementById('task-complexity');
    const taskComplexityValue = document.getElementById('task-complexity-value');
    const runSimulationButton = document.getElementById('run-simulation');
    const resultsDiv = document.getElementById('results');
    const simulationHistoryDiv = document.getElementById('simulation-history');
    const aiStateText = document.getElementById('ai-state-text');
    const brainIcon = document.querySelector('.brain-icon');

    let simulationHistory = [];

    safetyLevelSlider.addEventListener('input', () => {
        safetyLevelValue.textContent = safetyLevelSlider.value;
    });

    taskComplexitySlider.addEventListener('input', () => {
        taskComplexityValue.textContent = taskComplexitySlider.value;
    });

    runSimulationButton.addEventListener('click', runSimulation);

    function runSimulation() {
        const safetyLevel = parseInt(safetyLevelSlider.value);
        const taskComplexity = parseInt(taskComplexitySlider.value);

        setAIState('processing');
        runSimulationButton.disabled = true;

        setTimeout(() => {
            const result = simulateAISafety(safetyLevel, taskComplexity);
            displayResults(result);
            updateSimulationHistory(result);
            setAIState('idle');
            runSimulationButton.disabled = false;
        }, 2000);
    }

    function simulateAISafety(safetyLevel, taskComplexity) {
        const safetyThreshold = Math.random() * 100;
        const success = safetyLevel >= safetyThreshold;
        const task = generateTask();
        const ethicalConsideration = generateEthicalConsideration();

        return {
            success,
            safetyThreshold: safetyThreshold.toFixed(2),
            task,
            ethicalConsideration,
            safetyLevel,
            taskComplexity,
            reason: success ? generateSuccessReason() : generateFailureReason(),
            improvement: success ? null : generateSafetyImprovement()
        };
    }

    function displayResults(result) {
        let html = `
            <div class="alert ${result.success ? 'alert-success' : 'alert-danger'}">
                <h3>${result.success ? 'Success' : 'Failure'}</h3>
                <p>Task: ${result.task}</p>
                <p>${result.success ? 'Task completed safely' : 'Safety breach occurred'}. Safety threshold: ${result.safetyThreshold}</p>
                <p>Reason: ${result.reason}</p>
            </div>
        `;

        if (!result.success) {
            html += `
                <div class="alert alert-warning">
                    <h4>Safety Improvement Suggestion</h4>
                    <p>${result.improvement}</p>
                </div>
            `;
        }

        html += `
            <div class="alert alert-info">
                <h4>Ethical Consideration</h4>
                <p>${result.ethicalConsideration}</p>
            </div>
        `;

        resultsDiv.innerHTML = html;
    }

    function updateSimulationHistory(result) {
        simulationHistory.push(result);
        const totalRuns = simulationHistory.length;
        const successfulRuns = simulationHistory.filter(run => run.success).length;
        const successRate = (successfulRuns / totalRuns * 100).toFixed(2);

        const historyHtml = `
            <h3>Simulation History</h3>
            <p>Total Runs: ${totalRuns}</p>
            <p>Success Rate: ${successRate}%</p>
            <div class="progress-bar">
                <div class="progress-bar-fill" style="width: ${successRate}%"></div>
            </div>
        `;

        simulationHistoryDiv.innerHTML = historyHtml;
    }

    function setAIState(state) {
        aiStateText.textContent = state.charAt(0).toUpperCase() + state.slice(1);
        brainIcon.style.color = state === 'processing' ? '#007bff' : '#28a745';
    }

    function generateTask() {
        const tasks = [
            "Optimize city traffic flow",
            "Predict and mitigate natural disasters",
            "Develop personalized medical treatment plans",
            "Manage global supply chain logistics",
            "Create an adaptive educational curriculum"
        ];
        return tasks[Math.floor(Math.random() * tasks.length)];
    }

    function generateSuccessReason() {
        const reasons = [
            "Robust safety measures effectively contained potential risks",
            "AI's goal alignment ensured safe execution of the task",
            "Comprehensive testing anticipated and mitigated edge cases",
            "Effective real-time monitoring prevented potential issues"
        ];
        return reasons[Math.floor(Math.random() * reasons.length)];
    }

    function generateFailureReason() {
        const reasons = [
            "Insufficient safety protocols for task complexity",
            "Unexpected edge case in AI decision making",
            "Misalignment between AI goals and intended outcome",
            "Lack of robust fail-safes in critical situations"
        ];
        return reasons[Math.floor(Math.random() * reasons.length)];
    }

    function generateSafetyImprovement() {
        const improvements = [
            "Implement more rigorous testing scenarios",
            "Enhance AI's understanding of human values",
            "Develop more sophisticated constraint systems",
            "Improve real-time monitoring and intervention capabilities"
        ];
        return improvements[Math.floor(Math.random() * improvements.length)];
    }

    function generateEthicalConsideration() {
        const considerations = [
            "Ensure data privacy and consent in decision-making processes",
            "Address potential biases in AI algorithms and training data",
            "Consider long-term societal impacts of AI-driven solutions",
            "Balance efficiency gains with potential job displacement",
            "Maintain human oversight and intervention capabilities in critical systems"
        ];
        return considerations[Math.floor(Math.random() * considerations.length)];
    }
});