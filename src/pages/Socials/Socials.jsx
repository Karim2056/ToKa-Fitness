import React, { useState, useEffect } from "react"
import "./Socials.css"

// ----------------------------------------------------
// Mock Data (Test User & Initial Sample Data)
// ----------------------------------------------------
const CURRENT_USER_ID = "user_me_123" // Replace with logged-in user ID from Auth/Context

const MOCK_USERS = [
  {
    id: "user_test_99",
    name: "Alex Vance",
    username: "alex_fit",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Alex",
    bio: "PPL 6x/week | Prepping for 5k run 🏋️‍♂️",
  },
  {
    id: "user_test_88",
    name: "Sarah Chen",
    username: "sarah_lifts",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Sarah",
    bio: "Calisthenics enthusiast & meal prep fan 🥗",
  },
]

const INITIAL_MESSAGES = {
  user_test_99: [
    {
      id: "msg_1",
      senderId: "user_test_99",
      text: "Hey! Ready for tomorrow's leg session?",
      timestamp: "10:15 AM",
    },
    {
      id: "msg_2",
      senderId: CURRENT_USER_ID,
      text: "Yeah! Aiming for a new PR on squats.",
      timestamp: "10:18 AM",
    },
  ],
}

export default function Socials() {
  const [users, setUsers] = useState(MOCK_USERS)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeUser, setActiveUser] = useState(null)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [newMessageText, setNewMessageText] = useState("")

  // ----------------------------------------------------
  // BACKEND INTEGRATION: Fetching Users
  // ----------------------------------------------------
  useEffect(() => {
    /*
      FASTAPI + MONGODB LINK:
      
      FastAPI Route: GET /api/users?search={searchQuery}
      MongoDB Query:
        query = {"$or": [
          {"name": {"$regex": searchQuery, "$options": "i"}},
          {"username": {"$regex": searchQuery, "$options": "i"}}
        ]}
        users = await db.users.find(query).to_list(100)

      Example Fetch:
      async function fetchUsers() {
        try {
          const res = await fetch(`/api/users?search=${encodeURIComponent(searchQuery)}`)
          const data = await res.json()
          setUsers(data)
        } catch (err) {
          console.error("Failed to fetch users", err)
        }
      }
      fetchUsers()
    */
  }, [searchQuery])

  // ----------------------------------------------------
  // BACKEND INTEGRATION: Fetching Chat History
  // ----------------------------------------------------
  useEffect(() => {
    if (!activeUser) return

    /*
      FASTAPI + MONGODB LINK:
      
      FastAPI Route: GET /api/chats/{otherUserId}
      MongoDB Query:
        # Find messages between current user and selected user
        query = {
          "$or": [
            {"sender_id": current_user_id, "receiver_id": active_user_id},
            {"sender_id": active_user_id, "receiver_id": current_user_id}
          ]
        }
        messages = await db.messages.find(query).sort("timestamp", 1).to_list(200)

      Example Fetch:
      async function fetchChat() {
        const res = await fetch(`/api/chats/${activeUser.id}`)
        const data = await res.json()
        setMessages(prev => ({ ...prev, [activeUser.id]: data }))
      }
      fetchChat()
    */
  }, [activeUser])

  // Filtered users list for local state searching
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessageText.trim() || !activeUser) return

    const newMsgObj = {
      id: "msg_" + Date.now(),
      senderId: CURRENT_USER_ID,
      text: newMessageText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    // Update Local State UI immediately
    setMessages((prev) => ({
      ...prev,
      [activeUser.id]: [...(prev[activeUser.id] || []), newMsgObj],
    }))

    const sentText = newMessageText
    setNewMessageText("")

    /*
      FASTAPI + MONGODB LINK:
      
      Option A: REST API (HTTP POST)
      FastAPI Route: POST /api/messages
      Body: { "receiver_id": activeUser.id, "text": sentText }
      MongoDB Insert:
        doc = {
          "sender_id": current_user_id,
          "receiver_id": payload.receiver_id,
          "text": payload.text,
          "timestamp": datetime.utcnow()
        }
        await db.messages.insert_one(doc)

      Option B: WebSockets (Real-time messaging)
      ws.send(JSON.stringify({
        type: "NEW_MESSAGE",
        receiver_id: activeUser.id,
        text: sentText
      }))
    */
  }

  const activeUserMessages = activeUser ? messages[activeUser.id] || [] : []

  return (
    <>
      <div className="socials-body">
        <div className="socials-container">
          {/* Header & Search */}
          <div className="socials-header">
            <h2>Community & Chat</h2>
            <div className="search-bar-wrapper">
              <input
                type="text"
                className="socials-search-input"
                placeholder="Search athletes or trainers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="socials-content">
            {/* User Profiles Section (Stacked Vertically) */}
            <div className="user-list-section">
              <span className="section-title">Members</span>
              <div className="user-cards-stack">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className={`user-card ${
                        activeUser?.id === user.id ? "active" : ""
                      }`}
                      onClick={() => setActiveUser(user)}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="user-avatar"
                      />
                      <div className="user-info">
                        <div className="user-card-header">
                          <span className="user-name">{user.name}</span>
                          <span className="user-username">@{user.username}</span>
                        </div>
                        <p className="user-bio">{user.bio}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-users">No users found.</div>
                )}
              </div>
            </div>

            {/* Chat View Section */}
            <div className="chat-section">
              {activeUser ? (
                <div className="chat-window">
                  {/* Active Chat Header */}
                  <div className="chat-header">
                    <img
                      src={activeUser.avatar}
                      alt={activeUser.name}
                      className="chat-avatar"
                    />
                    <div>
                      <h3>{activeUser.name}</h3>
                      <span className="chat-status">@{activeUser.username}</span>
                    </div>
                    <button
                      className="close-chat-btn"
                      onClick={() => setActiveUser(null)}
                    >
                      ✕
                    </button>
                  </div>

                  {/* Message History */}
                  <div className="messages-list">
                    {activeUserMessages.length > 0 ? (
                      activeUserMessages.map((msg) => {
                        const isMe = msg.senderId === CURRENT_USER_ID
                        return (
                          <div
                            key={msg.id}
                            className={`message-bubble-wrapper ${
                              isMe ? "sent" : "received"
                            }`}
                          >
                            <div className="message-bubble">
                              <p className="message-text">{msg.text}</p>
                              <span className="message-time">
                                {msg.timestamp}
                              </span>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="empty-chat-placeholder">
                        Start a conversation with {activeUser.name}!
                      </div>
                    )}
                  </div>

                  {/* Input Bar */}
                  <form className="chat-input-form" onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      className="chat-input"
                      placeholder={`Message ${activeUser.name}...`}
                      value={newMessageText}
                      onChange={(e) => setNewMessageText(e.target.value)}
                    />
                    <button type="submit" className="send-btn">
                      Send
                    </button>
                  </form>
                </div>
              ) : (
                <div className="no-chat-selected">
                  <div className="chat-placeholder-icon">💬</div>
                  <h3>Select a profile to start chatting</h3>
                  <p>
                    Find workout partners, share meal plans, and keep each other
                    accountable.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}