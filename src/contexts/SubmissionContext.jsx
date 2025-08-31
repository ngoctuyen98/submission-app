import { createContext, useContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  submissions: [],
  loading: false,
  error: null,
  showCelebration: false,
  celebrationData: null,
};

// Action types
const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  ADD_SUBMISSION: "ADD_SUBMISSION",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  SHOW_CELEBRATION: "SHOW_CELEBRATION",
  HIDE_CELEBRATION: "HIDE_CELEBRATION",
  LOAD_SUBMISSIONS: "LOAD_SUBMISSIONS",
};

// Reducer function
function submissionReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case ACTIONS.ADD_SUBMISSION: {
      const newSubmissions = [...state.submissions, action.payload];
      // Sort by score (desc) then by time (asc)
      newSubmissions.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return a.time - b.time;
      });
      return { ...state, submissions: newSubmissions };
    }

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };

    case ACTIONS.SHOW_CELEBRATION:
      return {
        ...state,
        showCelebration: true,
        celebrationData: action.payload,
      };

    case ACTIONS.HIDE_CELEBRATION:
      return {
        ...state,
        showCelebration: false,
        celebrationData: null,
      };

    case ACTIONS.LOAD_SUBMISSIONS:
      return { ...state, submissions: action.payload, loading: false };

    default:
      return state;
  }
}

// Create context
const SubmissionContext = createContext();

// Provider component
export function SubmissionProvider({ children }) {
  const [state, dispatch] = useReducer(submissionReducer, initialState);

  // Load submissions from localStorage on mount
  useEffect(() => {
    const loadSubmissions = async () => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const savedSubmissions = localStorage.getItem("submissions");
        const submissions = savedSubmissions
          ? JSON.parse(savedSubmissions)
          : [];
        dispatch({ type: ACTIONS.LOAD_SUBMISSIONS, payload: submissions });
      } catch {
        dispatch({ type: ACTIONS.SET_ERROR, payload: "Không thể tải dữ liệu" });
      }
    };

    loadSubmissions();
  }, []);

  // Save to localStorage whenever submissions change
  useEffect(() => {
    if (state.submissions.length > 0) {
      localStorage.setItem("submissions", JSON.stringify(state.submissions));
    }
  }, [state.submissions]);

  // Actions
  const addSubmission = async (submissionData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: ACTIONS.CLEAR_ERROR });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newSubmission = {
        id: Date.now(),
        ...submissionData,
        timestamp: new Date().toISOString(),
      };

      dispatch({ type: ACTIONS.ADD_SUBMISSION, payload: newSubmission });

      // Show celebration based on score
      const celebrationType = getCelebrationType(submissionData.score);
      dispatch({
        type: ACTIONS.SHOW_CELEBRATION,
        payload: {
          type: celebrationType,
          score: submissionData.score,
          name: submissionData.name,
        },
      });

      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      return newSubmission;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: "Không thể nộp bài" });
      throw error;
    }
  };

  const hideCelebration = () => {
    dispatch({ type: ACTIONS.HIDE_CELEBRATION });
  };

  const clearError = () => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  };

  return (
    <SubmissionContext.Provider
      value={{
        ...state,
        addSubmission,
        hideCelebration,
        clearError,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
}

// Custom hook to use context
export function useSubmission() {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error("useSubmission must be used within a SubmissionProvider");
  }
  return context;
}

// Helper function to determine celebration type
function getCelebrationType(score) {
  if (score >= 90) return "excellent";
  if (score >= 80) return "good";
  if (score >= 70) return "average";
  return "needs_improvement";
}

export { ACTIONS };
