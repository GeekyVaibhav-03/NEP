import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";

export default function AIVoiceAssistant({ pageName, features = [] }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const assistantRef = useRef(null);
  const waveformRef = useRef(null);
  const recognition = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = "en-US";

      recognition.current.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          handleVoiceCommand(finalTranscript);
        }
      };

      recognition.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
      // Stop any ongoing speech when component unmounts
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    };
  }, []);

  // Separate effect for page introduction to ensure it runs on every page visit
  useEffect(() => {
    // Stop any previous speech before starting new one
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
    }
    setIsSpeaking(false);

    // Auto-introduce page features on mount or page change
    const timer = setTimeout(() => {
      introducePage();
    }, 1500);

    return () => {
      clearTimeout(timer);
      // Stop speech when page changes
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    };
  }, [pageName, features]);

  // Animation effects
  useEffect(() => {
    if (isVisible) {
      gsap.from(assistantRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    }
  }, [isVisible]);

  useEffect(() => {
    if (isSpeaking) {
      gsap.to(".voice-wave", {
        scaleY: "random(0.5, 2)",
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        stagger: 0.05,
      });
    } else {
      gsap.to(".voice-wave", {
        scaleY: 1,
        duration: 0.3,
      });
    }
  }, [isSpeaking]);

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech first
      speechSynthesis.cancel();

      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;

      // Try to use a more natural voice
      const voices = speechSynthesis.getVoices();
      const preferredVoices = voices.filter(
        (voice) =>
          voice.name.includes("Google") ||
          voice.name.includes("Microsoft") ||
          voice.name.includes("Alex") ||
          voice.name.includes("Samantha")
      );
      if (preferredVoices.length > 0) {
        utterance.voice = preferredVoices[0];
      }

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      speechSynthesis.speak(utterance);
      setResponse(text);
    }
  };

  const introducePage = () => {
    let intro = `Welcome to the ${pageName}! `;

    if (features.length > 0) {
      intro += `Here you can: ${features.join(", ")}. `;
    }

    intro += `I'm your AI assistant. Click the microphone to give voice commands, or ask me about any features. How can I help you today?`;

    speak(intro);
    setIsVisible(true);
  };

  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    let response = "";

    // Command processing logic
    if (
      lowerCommand.includes("help") ||
      lowerCommand.includes("what can you do")
    ) {
      response = `I can help you navigate this ${pageName}. Available features include: ${features.join(
        ", "
      )}. You can ask me to explain any feature or help you navigate.`;
    } else if (
      lowerCommand.includes("explain") ||
      lowerCommand.includes("what is")
    ) {
      if (lowerCommand.includes("timetable")) {
        response =
          "A timetable is a schedule showing when classes, meetings, or events are planned. Our system uses AI to create optimal schedules automatically.";
      } else if (lowerCommand.includes("analytics")) {
        response =
          "Analytics provide insights into your data with charts, graphs, and performance metrics to help you make better decisions.";
      } else if (lowerCommand.includes("faculty")) {
        response =
          "Faculty management allows you to add, edit, and organize teacher information, including their subjects, schedules, and workload.";
      } else {
        response =
          "I can explain any feature you see on this page. Just ask about a specific item you'd like to know more about.";
      }
    } else if (
      lowerCommand.includes("navigate") ||
      lowerCommand.includes("go to")
    ) {
      response =
        "I can help you navigate. You can use the menu at the top to access different sections, or tell me specifically where you'd like to go.";
    } else if (lowerCommand.includes("features")) {
      response = `This ${pageName} includes these features: ${features.join(
        ", "
      )}. Would you like me to explain any specific feature?`;
    } else if (lowerCommand.includes("thank")) {
      response =
        "You're welcome! I'm here whenever you need assistance with the timetable system.";
    } else if (
      lowerCommand.includes("hide") ||
      lowerCommand.includes("close")
    ) {
      response =
        "I'll minimize myself now. Click the AI assistant button to bring me back anytime!";
      setTimeout(() => setIsVisible(false), 2000);
    } else {
      response = `I heard you say "${command}". I can help you with features like: ${features
        .slice(0, 3)
        .join(", ")}. What would you like to know more about?`;
    }

    speak(response);
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.current?.stop();
      setIsListening(false);
    } else {
      // Stop any ongoing speech before starting to listen
      stopSpeech();
      recognition.current?.start();
      setIsListening(true);
      setTranscript("");
    }
  };

  const toggleVisibility = () => {
    if (isVisible) {
      // Stop speech and listening when hiding
      stopSpeech();
      if (recognition.current && isListening) {
        recognition.current.stop();
        setIsListening(false);
      }
    }
    setIsVisible(!isVisible);
    if (!isVisible) {
      speak(`AI Assistant activated for ${pageName}. How can I help you?`);
    }
  };

  return (
    <>
      {/* AI Assistant Toggle Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={toggleVisibility}
          className="group p-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110"
          title="AI Voice Assistant"
        >
          <SmartToyIcon className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
          {isSpeaking && (
            <div className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping" />
          )}
        </button>
      </div>

      {/* AI Assistant Panel */}
      {isVisible && (
        <div
          ref={assistantRef}
          className="fixed bottom-20 left-4 z-50 w-80 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-6"
          style={{
            backdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl">
                <SmartToyIcon className="text-white text-xl" />
                {isSpeaking && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-xl animate-pulse" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  AI Assistant
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {isSpeaking
                    ? "Speaking..."
                    : isListening
                    ? "Listening..."
                    : "Ready to help"}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                stopSpeech();
                if (recognition.current && isListening) {
                  recognition.current.stop();
                  setIsListening(false);
                }
                setIsVisible(false);
              }}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <CloseIcon
                fontSize="small"
                className="text-slate-600 dark:text-slate-300"
              />
            </button>
          </div>

          {/* Voice Waveform */}
          <div
            ref={waveformRef}
            className="flex items-center justify-center gap-1 h-12 mb-4"
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`voice-wave w-1 bg-gradient-to-t from-purple-500 to-indigo-500 rounded-full transition-all duration-100 ${
                  isSpeaking ? "h-full" : "h-2"
                }`}
                style={{
                  animationDelay: `${i * 50}ms`,
                }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={toggleListening}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isListening
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25"
                  : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300"
              }`}
            >
              {isListening ? <MicIcon /> : <MicOffIcon />}
            </button>

            {isSpeaking ? (
              <button
                onClick={stopSpeech}
                className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all duration-300 transform hover:scale-110 shadow-lg shadow-red-500/25"
                title="Stop Speaking"
              >
                <VolumeOffIcon />
              </button>
            ) : (
              <button
                onClick={() =>
                  speak(
                    `Current page: ${pageName}. Available features: ${features.join(
                      ", "
                    )}`
                  )
                }
                className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 transform hover:scale-110 shadow-lg shadow-blue-500/25"
                title="Repeat Page Info"
              >
                <VolumeUpIcon />
              </button>
            )}

            <button
              onClick={() =>
                speak(
                  "Voice assistant ready. You can ask me about any features or ask for help navigating this page."
                )
              }
              className="p-3 rounded-full bg-green-500 hover:bg-green-600 text-white transition-all duration-300 transform hover:scale-110 shadow-lg shadow-green-500/25"
              title="Get Help"
            >
              <SettingsVoiceIcon />
            </button>
          </div>

          {/* Transcript and Response */}
          <div className="space-y-3">
            {transcript && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>You said:</strong> {transcript}
                </p>
              </div>
            )}

            {response && (
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  <strong>AI:</strong> {response}
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Quick Commands:
            </p>
            <div className="flex flex-wrap gap-2">
              {["Help", "Features", "Navigate"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleVoiceCommand(cmd)}
                  className="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-full transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
