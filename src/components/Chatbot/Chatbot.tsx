import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  X,
  Send,
  Moon,
  Sun,
  Minus,
  Maximize,
  SpellCheck,
  Download,
  Star
} from 'lucide-react';
import './Chatbot.css';

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

type ChatState = 'email' | 'chat' | 'meeting';

interface UserDetails {
  email: string;
}

interface Message {
  type: 'user' | 'bot';
  text: string;
  quickReplies?: string[];
}

interface MeetingDetails {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  date: string;
  time: string;
  timezone: string;
  message: string;
}

function Chatbot(): JSX.Element {
  const [chatOpen, setChatOpen] = useState<boolean>(false);

  const [chatState, setChatState] =
    useState<ChatState>('email');

  const [meetingChoicePending, setMeetingChoicePending] =
    useState<boolean>(false);

  const [userDetails, setUserDetails] =
    useState<UserDetails>({
      email: ''
    });

  const [expandedMessages, setExpandedMessages] =
    useState<Record<number, boolean>>({});

  const [meetingDetails, setMeetingDetails] =
    useState<MeetingDetails>({
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '+91',
      phone: '',
      date: '',
      time: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      message: ''
    });

  const [messages, setMessages] = useState<Message[]>([]);

  const [inputMessage, setInputMessage] =
    useState<string>('');

  const [isLoading, setIsLoading] =
    useState<boolean>(false);

  const [sessionId, setSessionId] =
    useState<string>('');

  const [messageCountAfterHelp, setMessageCountAfterHelp] =
    useState<number>(0);

  const [meetingPromptShown, setMeetingPromptShown] =
    useState<boolean>(false);

  const [isDarkMode, setIsDarkMode] =
    useState<boolean>(false);

  const [spellCheckEnabled, setSpellCheckEnabled] =
    useState<boolean>(true);

  const [isFullscreen, setIsFullscreen] =
    useState<boolean>(false);

  const [dropdownOpen, setDropdownOpen] = 
    useState(false);

  const [downloadPromptMode, setDownloadPromptMode] =
    useState<boolean>(false);

  const [feedbackMode, setFeedbackMode] =
    useState<boolean>(false);

  const [rating, setRating] =
    useState<number>(0);

  const [feedbackText, setFeedbackText] =
    useState<string>('');

  const [hoverRating, setHoverRating] =
    useState<number>(0);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  const [chatLimitReached, setChatLimitReached] =
    useState<boolean>(false);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const timeSlots = Array.from({ length: 23 }, (_, index) => {
    const totalMinutes = 10 * 60 + index * 30;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const displayHour =
      hours > 12 ? hours - 12 : hours;

    const ampm =
      hours >= 12 ? 'PM' : 'AM';

    return `${displayHour}:${minutes === 0 ? '00' : minutes} ${ampm}`;
  });

  const countryCodes = [
    { country: 'IND', code: '+91' },
    { country: 'USA', code: '+1' },
    { country: 'UK', code: '+44' },
    { country: 'AUS', code: '+61' },
    { country: 'GER', code: '+49' },
    { country: 'UAE', code: '+971' },
    { country: 'SGP', code: '+65' },
    { country: 'JPN', code: '+81' },
    { country: 'CHN', code: '+86' }
  ];

  const timezones =
    typeof Intl.supportedValuesOf === 'function'
      ? Intl.supportedValuesOf('timeZone')
      : [
          'Asia/Kolkata',
          'UTC',
          'America/New_York',
          'America/Los_Angeles',
          'Europe/London',
          'Europe/Berlin',
          'Asia/Dubai',
          'Asia/Singapore'
        ];

  const today = new Date();

  const maxMeetingDate = new Date();
  maxMeetingDate.setMonth(maxMeetingDate.getMonth() + 1);

  const formatDateInput = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const MESSAGE_PREVIEW_LIMIT = 250;

  const shouldTruncateMessage = (text: string): boolean => {
    return text.length > MESSAGE_PREVIEW_LIMIT;
  };

  const toggleMessageExpanded = (index: number): void => {
    setExpandedMessages((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    const savedChatOpen =
      sessionStorage.getItem('chatOpen');

    const savedChatState =
      sessionStorage.getItem('chatState');

    const savedMessages =
      sessionStorage.getItem('messages');

    const savedUserDetails =
      sessionStorage.getItem('userDetails');

    const savedMeetingDetails =
      sessionStorage.getItem('meetingDetails');

    const savedSessionId =
      sessionStorage.getItem('sessionId');

    const savedMessageCountAfterHelp =
      sessionStorage.getItem('messageCountAfterHelp');

    const savedMeetingPromptShown =
      sessionStorage.getItem('meetingPromptShown');
    
    const savedMeetingChoicePending =
      sessionStorage.getItem('meetingChoicePending');

    if (savedMeetingChoicePending) {
      setMeetingChoicePending(
        JSON.parse(savedMeetingChoicePending)
      );
    }

    if (savedChatOpen) {
      setChatOpen(JSON.parse(savedChatOpen));
    }

    if (
      savedChatState === 'email' ||
      savedChatState === 'chat' ||
      savedChatState === 'meeting'
    ) {
      setChatState(savedChatState);
    }

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    if (savedUserDetails) {
      setUserDetails(JSON.parse(savedUserDetails));
    }

    if (savedMeetingDetails) {
      setMeetingDetails(JSON.parse(savedMeetingDetails));
    }

    if (savedSessionId) {
      setSessionId(savedSessionId);
    }

    if (savedMessageCountAfterHelp) {
      setMessageCountAfterHelp(
        Number(savedMessageCountAfterHelp)
      );
    }

    if (savedMeetingPromptShown) {
      setMeetingPromptShown(
        JSON.parse(savedMeetingPromptShown)
      );
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatState]);

  useEffect(() => {
    sessionStorage.setItem(
      'chatOpen',
      JSON.stringify(chatOpen)
    );

    sessionStorage.setItem(
      'chatState',
      chatState
    );

    sessionStorage.setItem(
      'messages',
      JSON.stringify(messages)
    );

    sessionStorage.setItem(
      'userDetails',
      JSON.stringify(userDetails)
    );

    sessionStorage.setItem(
      'meetingDetails',
      JSON.stringify(meetingDetails)
    );

    sessionStorage.setItem(
      'sessionId',
      sessionId
    );

    sessionStorage.setItem(
      'messageCountAfterHelp',
      String(messageCountAfterHelp)
    );

    sessionStorage.setItem(
      'meetingPromptShown',
      JSON.stringify(meetingPromptShown)
    );

    sessionStorage.setItem(
      'meetingChoicePending',
      JSON.stringify(meetingChoicePending)
    );

  }, [
    chatOpen,
    chatState,
    messages,
    userDetails,
    meetingDetails,
    sessionId,
    messageCountAfterHelp,
    meetingPromptShown,
    meetingChoicePending
  ]);

  const startSession = async (
    email: string | null
  ): Promise<void> => {
    const newSessionId =
      `session_${Date.now()}`; /*sessionId ||*/

    setSessionId(newSessionId);

    const response = await axios.post(`${BACKEND_URL}/user`, {
      session_id: newSessionId,
      email
    });
    const isExistingUser =
      response.data.is_existing_user;

    setMeetingDetails((prev) => ({
      ...prev,
      email: email || ''
    }));

    let greetingText = '';

    if (!email) {
      greetingText =
        'Hello! You are continuing as a guest. How may I help you?';
    } else if (isExistingUser) {
      greetingText =
        'Hello! Welcome back. How may I help you?';
    } else {
      greetingText =
        'Hello! Thanks for sharing your email. How may I help you?';
    }

    setMessages([
      {
        type: 'bot',
        text: greetingText
      }
    ]);

    setChatLimitReached(false);
    setMeetingChoicePending(false);
    setMessageCountAfterHelp(0);
    setMeetingPromptShown(false);
    setDownloadPromptMode(false);
    setFeedbackMode(false);
    setChatState('chat');
  };

  const handleEmailSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const email = userDetails.email.trim();

    try {
      setIsLoading(true);

      await startSession(email || null);
    } catch (error) {
      console.error('Error starting chat:', error);

      alert('Could not start chat. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueAsGuest = async (): Promise<void> => {
    try {
      setIsLoading(true);

      await startSession(null);
    } catch (error) {
      console.error('Error starting guest chat:', error);

      alert('Could not start chat. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleQuickReply = async (reply: string): Promise<void> => {
    if (reply === 'Yes') {
      setMeetingChoicePending(false);

      setMessages((prev) => [
        ...prev,
        {
          type: 'user',
          text: 'Yes'
        },
        {
          type: 'bot',
          text: 'Sure. Please fill out the meeting form.'
        }
      ]);

      setMeetingDetails((prev) => ({
        ...prev,
        email: prev.email || userDetails.email
      }));

      setTimeout(() => {
        setChatState('meeting');
      }, 700);

      return;
    }

    if (reply === 'No') {
      setMeetingChoicePending(false);

      setMessages((prev) => [
        ...prev,
        {
          type: 'user',
          text: 'No'
        },
        {
          type: 'bot',
          text: chatLimitReached
          ? 'No problem. You can close this chat, or contact us later for further details.'
          : 'No problem. You can continue chatting with me.'
        }
      ]);

      if (chatLimitReached) {
        setTimeout(() => {
          setDownloadPromptMode(true);
        }, 3200);
      }

      setMeetingPromptShown(true);
    }
  };

  const handleSendMessage = async (
    e?: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e?.preventDefault();

    if (!inputMessage.trim() || isLoading) {
      return;
    }

    const userMessage = inputMessage.trim();
    const lowerMessage = userMessage.toLowerCase();

    setInputMessage('');

    setMessages((prev) => [
      ...prev,
      {
        type: 'user',
        text: userMessage
      }
    ]);

    setIsLoading(true);


    try {

      const response = await axios.post(
        `${BACKEND_URL}/chat`,
        {
          session_id: sessionId,
          message: userMessage,
          email: userDetails.email || null
        }
      );
      
      const botReply = response.data.response;
      const action = response.data.action;
      const limitMessage = response.data.limit_message;
      
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: botReply
        }
      ]);

      if (response.data.chat_limit_reached) {
        setChatLimitReached(true);
      }

      if (limitMessage) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              type: 'bot',
              text: limitMessage
            },
            {
              type: 'bot',
              text: 'Would you like us to arrange a meeting with our team?',
              quickReplies: ['Yes', 'No']
            }
          ]);

          setMeetingPromptShown(true);
          setMeetingChoicePending(true);
        }, 700);

        return;
      }

      if (action === 'ask_meeting_confirmation') {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              type: 'bot',
              text: 'Would you like us to arrange a meeting with our team?',
              quickReplies: ['Yes', 'No']
            }
          ]);

          setMeetingPromptShown(true);
          setMeetingChoicePending(true);
        }, 600);

        return;
      }

      if (action === 'show_meeting_form'){
        setMeetingDetails((prev) => ({
          ...prev,
          email: prev.email || userDetails.email
        }));

        setMeetingPromptShown(true);
        setTimeout(() => {
          setChatState('meeting');
        }, 3000);
        return;
      }

      const nextCount = messageCountAfterHelp + 1;

      setMessageCountAfterHelp(nextCount);

      if (
        nextCount >= 2 &&
        !meetingPromptShown
      ) {
        setMeetingPromptShown(true);
        setMeetingChoicePending(true);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              type: 'bot',
              text: 'Would you like us to arrange a meeting with our team?',
              quickReplies: ['Yes', 'No']
            }
          ]);
        }, 700);
      }
    } catch (error) {
      console.error('Error sending message:', error);

      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: 'Sorry, I encountered an error while processing your request.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const convertTimeTo24Hour = (time: string): string => {
    const [rawTime, modifier] = time.split(' ');
    let [hours, minutes] = rawTime.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    }

    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
  };

  const getTimeInTimezone = (
    date: string,
    time: string,
    timezone: string
  ): Date => {
    const time24 = convertTimeTo24Hour(time);

    const localDate = new Date(`${date}T${time24}`);

    const timezoneDateString = localDate.toLocaleString('en-US', {
      timeZone: timezone
    });

    return new Date(timezoneDateString);
  };

  const validateMeetingTime = (): boolean => {
    if (
      !meetingDetails.date ||
      !meetingDetails.time ||
      !meetingDetails.timezone
    ) {
      return false;
    }

    const selectedDateTime = getTimeInTimezone(
      meetingDetails.date,
      meetingDetails.time,
      meetingDetails.timezone
    );

    const companyTime = selectedDateTime.toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const [hour] = companyTime.split(':').map(Number);

    return hour >= 10 && hour < 21;
  };

  const handleMeetingSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateMeetingTime()) {
      alert(
        'Please change the time as it does not lie in our 10 AM to 9 PM availability range.'
      );
      return;
    }

    try {
      setIsLoading(true);

      await axios.post(`${BACKEND_URL}/meeting`, {
        session_id: sessionId,
        first_name: meetingDetails.firstName,
        last_name: meetingDetails.lastName,
        email: meetingDetails.email,
        phone: `${meetingDetails.countryCode} ${meetingDetails.phone}`,
        meeting_date: meetingDetails.date,
        meeting_time: meetingDetails.time,
        timezone: meetingDetails.timezone,
        message: meetingDetails.message
      });

      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: 'Thank you. Your meeting request has been submitted successfully.'
        }
      ]);

      setChatState('chat');
      setTimeout(() => {
        setDownloadPromptMode(true);
      }, 3200);
    } catch (error) {
      console.error('Error submitting meeting:', error);

      alert('Could not submit meeting request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadChat = (): void => {
    const userLabel =
      userDetails.email || 'Guest';

    let chatText =
      `Chat Session with Synexa\nUser: ${userLabel}\n\n`;

    messages.forEach((msg) => {
      chatText += `${msg.type === 'bot' ? 'Synexa' : userLabel}: ${msg.text}\n\n`;
    });

    const blob = new Blob([chatText], {
      type: 'text/plain'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'chat_transcript.txt';
    a.click();

    URL.revokeObjectURL(url);
  };

  const submitFeedback = async (): Promise<void> => {
    try {
      setMeetingChoicePending(false);
      await axios.post(`${BACKEND_URL}/feedback`, {
        session_id: sessionId,
        email: userDetails.email || null,
        rating,
        feedback_text: feedbackText
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }

    setChatOpen(false);

    setTimeout(() => {
      setFeedbackMode(false);
      setDownloadPromptMode(false);
      setChatState('email');
      setMessages([]);
      setRating(0);
      setFeedbackText('');
      setHoverRating(0);
      setInputMessage('');
      setMessageCountAfterHelp(0);
      setMeetingPromptShown(false);
      setUserDetails({
        email: ''
      });
      setMeetingDetails({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '',
        phone: '',
        date: '',
        time: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        message: ''
      });
      setSessionId('');
      sessionStorage.clear();
    }, 300);
  };

  const handleDownloadAndProceed = (): void => {
    downloadChat();
    setDownloadPromptMode(false);
    setFeedbackMode(true);
  };

  const handleSkipDownload = (): void => {
    setDownloadPromptMode(false);
    setFeedbackMode(true);
  };

  const handleClose = (): void => {
    if (
      chatState !== 'email' &&
      messages.length > 0
    ) {
      setDownloadPromptMode(true);
    } else {
      setChatOpen(false);
    }
  };


  return (
    <div className="chatbot-container">
      <div className="chatbot-toggle-wrapper">
        {!chatOpen && (
          <div className="chatbot-popup">
            How may I help you?
          </div>
        )}

        <button
          className={`chatbot-toggle ${chatOpen ? 'open' : ''}`}
          onClick={() => setChatOpen(!chatOpen)}
        >
          {chatOpen ? (
            <X size={32} color="white" />
          ) : (
          <img
            src="/logo-small.webp"
            alt="Chatbot"
            width={48}
            height={48}
            className="chatbot-icon-img"
          />
          )}
        </button>
      </div>

      {chatOpen && (
        <div
          className={`chatbot-window ${isDarkMode ? 'dark-mode' : ''} ${isFullscreen ? 'fullscreen' : ''}`}
        >
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <h3>Synexa</h3>

              <div className="online-status">
                <span className="status-dot"></span> Online
              </div>
            </div>

            <div className="chatbot-header-controls">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="control-btn"
                title="Toggle Theme"
              >
                {isDarkMode ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="control-btn"
                title="Toggle Fullscreen"
              >
                <Maximize size={18} />
              </button>


              <button
                onClick={handleClose}
                className="control-btn chatbot-close"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div
            className={`chatbot-body ${
              chatState === 'chat' &&
              !downloadPromptMode &&
              !feedbackMode
                ? 'is-chat'
                : ''
            }`}
          >
            {downloadPromptMode ? (
              <div className="download-prompt-view fade-in">
                <div className="prompt-icon">
                  <Download
                    size={48}
                    color="var(--primary-red)"
                  />
                </div>

                <h3>Save Chat Transcript?</h3>

                <p>
                  Would you like to download a copy of this
                  conversation before you go?
                </p>

                <div className="prompt-actions">
                  <button
                    className="btn-primary"
                    onClick={handleDownloadAndProceed}
                  >
                    Download Chat
                  </button>

                  <button
                    className="btn-secondary"
                    onClick={handleSkipDownload}
                  >
                    Skip
                  </button>
                </div>
              </div>
            ) : feedbackMode ? (
              <div className="feedback-view fade-in">
                <h3>Session Ended</h3>

                <div className="rating-section">
                  <p>Rate your experience:</p>

                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={28}
                        className={
                          star <= (hoverRating || rating)
                            ? 'star active'
                            : 'star'
                        }
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        fill={
                          star <= (hoverRating || rating)
                            ? '#ffc107'
                            : 'none'
                        }
                        color={
                          star <= (hoverRating || rating)
                            ? '#ffc107'
                            : '#cbd5e1'
                        }
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </div>
                </div>

                <textarea
                  className="feedback-input"
                  placeholder="Tell us about your experience..."
                  value={feedbackText}
                  onChange={(e) =>
                    setFeedbackText(e.target.value)
                  }
                  rows={4}
                />

                <button
                  className="submit-btn"
                  onClick={submitFeedback}
                >
                  Submit & Close
                </button>
              </div>
            ) : chatState === 'email' ? (
              <form
                className="chatbot-form"
                onSubmit={handleEmailSubmit}
              >
                <p>
                  Hello! Please enter your email to continue,
                  or skip and continue as guest.
                </p>

                <div className="input-group">
                  <label>Email</label>

                  <input
                    type="email"
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails({
                        email: e.target.value
                      })
                    }
                    placeholder="john@example.com"
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Starting...' : 'Continue'}
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleContinueAsGuest}
                  disabled={isLoading}
                >
                  Continue as Guest
                </button>
              </form>
            ) : chatState === 'meeting' ? (
              <form
                className="chatbot-form meeting-form"
                onSubmit={handleMeetingSubmit}
              >
                <p>Book a meeting with our team.</p>

                <div className="input-group">
                  <label>First Name *</label>

                  <input
                    type="text"
                    required
                    value={meetingDetails.firstName}
                    onChange={(e) =>
                      setMeetingDetails({
                        ...meetingDetails,
                        firstName: e.target.value
                      })
                    }
                  />
                </div>

                <div className="input-group">
                  <label>Last Name *</label>

                  <input
                    type="text"
                    required
                    value={meetingDetails.lastName}
                    onChange={(e) =>
                      setMeetingDetails({
                        ...meetingDetails,
                        lastName: e.target.value
                      })
                    }
                  />
                </div>

                <div className="input-group">
                  <label>Email *</label>

                  <input
                    type="email"
                    required
                    value={meetingDetails.email}
                    onChange={(e) =>
                      setMeetingDetails({
                        ...meetingDetails,
                        email: e.target.value
                      })
                    }
                  />
                </div>

                <div className="input-group">
                  <label>Phone Number *</label>

                  <div className="phone-input-wrapper">
                    <div className="country-dropdown">
                      <button
                        type="button"
                        className="country-dropdown-trigger"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        {meetingDetails.countryCode}
                      </button>

                      {dropdownOpen && (
                        <div className="country-dropdown-menu">
                          {countryCodes.map((item) => (
                            <button
                              key={item.code}
                              type="button"
                              className="country-option"
                              onClick={() => {
                                setMeetingDetails({
                                  ...meetingDetails,
                                  countryCode: item.code
                                });

                                setDropdownOpen(false);
                              }}
                            >
                              {item.country} ({item.code})
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <input
                      type="tel"
                      required
                      value={meetingDetails.phone}
                      onChange={(e) =>
                        setMeetingDetails({
                          ...meetingDetails,
                          phone: e.target.value
                        })
                      }
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Date *</label>

                  <input
                    type="date"
                    required
                    min={formatDateInput(today)}
                    max={formatDateInput(maxMeetingDate)}
                    value={meetingDetails.date}
                    onChange={(e) =>
                      setMeetingDetails({
                        ...meetingDetails,
                        date: e.target.value
                      })
                    }
                  />
                </div>

                <div className="input-group">
                  <label>Time *</label>

                  <select
                    required
                    value={meetingDetails.time}
                    onChange={(e) =>
                      setMeetingDetails({
                        ...meetingDetails,
                        time: e.target.value
                      })
                    }
                  >
                    <option value="">Select Time</option>

                    {timeSlots.map((slot) => (
                      <option
                        key={slot}
                        value={slot}
                      >
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label>Timezone *</label>

                  <select
                    required
                    value={meetingDetails.timezone}
                    onChange={(e) =>
                      setMeetingDetails({
                        ...meetingDetails,
                        timezone: e.target.value
                      })
                    }
                  >
                    {timezones.map((timezone) => (
                      <option
                        key={timezone}
                        value={timezone}
                      >
                        {timezone}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label>Message</label>

                  <textarea
                    className="meeting-message-input"
                    value={meetingDetails.message}
                    onChange={(e) =>
                      setMeetingDetails({
                        ...meetingDetails,
                        message: e.target.value
                      })
                    }
                    placeholder="Tell us briefly about your requirement..."
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading
                    ? 'Submitting...'
                    : 'Submit Meeting Request'}
                </button>
              </form>
            ) : (
              <>
                {messages.map((msg, idx) => {
                  const isLongBotMessage =
                    msg.type === 'bot' && shouldTruncateMessage(msg.text);

                  const isExpanded =
                    expandedMessages[idx] || false;

                  const visibleText =
                    isLongBotMessage && !isExpanded
                      ? `${msg.text.slice(0, MESSAGE_PREVIEW_LIMIT).trim()}...`
                      : msg.text;

                  return (
                    <div
                      key={idx}
                      className={`message-row ${msg.type}`}
                    >
                      <div className={`message ${msg.type}`}>
                        <span>{visibleText}</span>

                        {isLongBotMessage && (
                          <button
                            type="button"
                            className="read-more-btn"
                            onClick={() => toggleMessageExpanded(idx)}
                          >
                            {isExpanded ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </div>

                      {msg.type === 'bot' &&
                        msg.quickReplies &&
                        idx === messages.length - 1 && (
                          <div className="quick-replies">
                            {msg.quickReplies.map((reply) => (
                              <button
                                key={reply}
                                type="button"
                                className="quick-reply-btn"
                                onClick={() => handleQuickReply(reply)}
                              >
                                {reply}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {chatState === 'chat' &&
            !feedbackMode &&
            !downloadPromptMode &&
            !meetingChoicePending && 
            !chatLimitReached && (
              <form
                className="chat-input-area"
                onSubmit={handleSendMessage}
              >
                <div className="message-input-wrapper">
                  <textarea
                    value={inputMessage}
                    onChange={(e) =>
                      setInputMessage(
                        e.target.value
                          .replace(/ {2,}/g, ' ')
                          .slice(0, 250))
                    }
                    onKeyDown={(e) => {
                      if (meetingChoicePending) {
                        e.preventDefault();
                        return;
                      }

                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();

                        if (
                          inputMessage.trim() &&
                          !isLoading
                        ) {
                          handleSendMessage();
                        }
                      }
                    }}
                    placeholder={
                      meetingChoicePending
                        ? 'Please select Yes or No above...'
                        : 'Type a message...'
                    }
                    disabled={isLoading || meetingChoicePending}
                    // spellCheck={spellCheckEnabled}
                    rows={1}
                    maxLength={250}
                    spellCheck={true}
                  />

                  {inputMessage.length >= 220 && (
                    <span className="floating-char-counter">
                      {inputMessage.length}/250
                    </span>
                  )}
                </div>

                <div className="input-controls">
                  {/* <button
                    type="button"
                    className={`spellcheck-btn ${
                      spellCheckEnabled ? 'active' : ''
                    }`}
                    onClick={() =>
                      setSpellCheckEnabled(!spellCheckEnabled)
                    }
                    title="Toggle Spell Check"
                  >
                    <SpellCheck size={18} />
                  </button> */}

                  <button
                    type="submit"
                    className="send-btn"
                    disabled={
                      isLoading || meetingChoicePending || !inputMessage.trim()
                    }
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            )}
        </div>
      )}
    </div>
  );
}

export default Chatbot;