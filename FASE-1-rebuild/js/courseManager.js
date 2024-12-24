// Course Management System
class CourseManager {
    constructor() {
        this.currentModule = null;
        this.modules = {};
        this.userProgress = this.loadProgress();
    }

    // Initialize module data
    initializeModule(moduleId, totalSections) {
        if (!this.modules[moduleId]) {
            this.modules[moduleId] = {
                id: moduleId,
                totalSections: totalSections,
                completedSections: 0,
                quizScores: {},
                timeSpent: 0,
                lastAccessed: new Date()
            };
        }
        return this.modules[moduleId];
    }

    // Load saved progress from localStorage
    loadProgress() {
        const savedProgress = localStorage.getItem('courseProgress');
        return savedProgress ? JSON.parse(savedProgress) : {};
    }

    // Save progress to localStorage
    saveProgress() {
        localStorage.setItem('courseProgress', JSON.stringify(this.userProgress));
    }

    // Update section completion
    updateSectionProgress(moduleId, sectionId, completed) {
        if (!this.userProgress[moduleId]) {
            this.userProgress[moduleId] = {
                completedSections: [],
                quizScores: {},
                overallProgress: 0
            };
        }

        if (completed && !this.userProgress[moduleId].completedSections.includes(sectionId)) {
            this.userProgress[moduleId].completedSections.push(sectionId);
            this.calculateModuleProgress(moduleId);
            this.saveProgress();
        }
    }

    // Calculate overall module progress
    calculateModuleProgress(moduleId) {
        const module = this.modules[moduleId];
        if (module) {
            const completed = this.userProgress[moduleId].completedSections.length;
            this.userProgress[moduleId].overallProgress = (completed / module.totalSections) * 100;
        }
    }

    // Save quiz score
    saveQuizScore(moduleId, quizId, score) {
        if (!this.userProgress[moduleId]) {
            this.userProgress[moduleId] = {
                completedSections: [],
                quizScores: {},
                overallProgress: 0
            };
        }
        this.userProgress[moduleId].quizScores[quizId] = score;
        this.saveProgress();
    }

    // Get quiz score
    getQuizScore(moduleId, quizId) {
        return this.userProgress[moduleId]?.quizScores[quizId] || 0;
    }

    // Check if module is completed
    isModuleCompleted(moduleId) {
        return this.userProgress[moduleId]?.overallProgress === 100;
    }

    // Get module progress
    getModuleProgress(moduleId) {
        return this.userProgress[moduleId]?.overallProgress || 0;
    }

    // Get all modules progress
    getAllProgress() {
        return this.userProgress;
    }
}

// Quiz Management System
class QuizManager {
    constructor() {
        this.currentQuiz = null;
        this.courseManager = null;
    }

    setCourseManager(courseManager) {
        this.courseManager = courseManager;
    }

    initializeQuiz(quizData) {
        this.currentQuiz = {
            moduleId: quizData.moduleId,
            quizId: quizData.quizId,
            questions: quizData.questions,
            currentQuestion: 0,
            userAnswers: [],
            score: 0
        };
    }

    submitAnswer(answer) {
        if (!this.currentQuiz) return false;

        this.currentQuiz.userAnswers.push(answer);
        const currentQuestion = this.currentQuiz.questions[this.currentQuiz.currentQuestion];
        
        if (answer === currentQuestion.correctAnswer) {
            this.currentQuiz.score++;
        }

        this.currentQuiz.currentQuestion++;
        
        if (this.isQuizComplete()) {
            this.finalizeQuiz();
        }

        return true;
    }

    isQuizComplete() {
        return this.currentQuiz.currentQuestion >= this.currentQuiz.questions.length;
    }

    finalizeQuiz() {
        const finalScore = (this.currentQuiz.score / this.currentQuiz.questions.length) * 100;
        if (this.courseManager) {
            this.courseManager.saveQuizScore(
                this.currentQuiz.moduleId,
                this.currentQuiz.quizId,
                finalScore
            );
        }
        return finalScore;
    }

    getCurrentQuestion() {
        if (!this.currentQuiz || this.isQuizComplete()) return null;
        return this.currentQuiz.questions[this.currentQuiz.currentQuestion];
    }

    getQuizResults() {
        if (!this.currentQuiz || !this.isQuizComplete()) return null;
        return {
            score: (this.currentQuiz.score / this.currentQuiz.questions.length) * 100,
            totalQuestions: this.currentQuiz.questions.length,
            correctAnswers: this.currentQuiz.score,
            answers: this.currentQuiz.userAnswers
        };
    }
}

// Progress Tracking System
class ProgressTracker {
    constructor(courseManager) {
        this.courseManager = courseManager;
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            threshold: 0.5,
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    const moduleId = section.getAttribute('data-module-id');
                    const sectionId = section.getAttribute('data-section-id');
                    
                    if (moduleId && sectionId) {
                        this.courseManager.updateSectionProgress(moduleId, sectionId, true);
                        this.updateProgressUI(moduleId);
                    }
                }
            });
        }, options);
    }

    startTracking() {
        document.querySelectorAll('[data-section-id]').forEach(section => {
            this.observer.observe(section);
        });
    }

    updateProgressUI(moduleId) {
        const progress = this.courseManager.getModuleProgress(moduleId);
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);
        }
    }

    stopTracking() {
        this.observer.disconnect();
    }
}

// Export the managers
window.CourseManager = CourseManager;
window.QuizManager = QuizManager;
window.ProgressTracker = ProgressTracker;
