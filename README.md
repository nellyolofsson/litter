
# Welcome to litterplatform!
https://cscloud8-229.lnu.se/

# Architectural overview of the system

Frontend: The frontend is the heart of the application. It integrates with our two main services, Litter and User, through APIs and communicates with the Litter service via WebSocket for real-time updates. Session data is managed by the backend, which stores it in Redis, ensuring consistency and scalability. The frontend accesses this session information via API calls to the backend.


User Service: The User Service handles user authentication (including OAuth), profile management, and follower relationships. It uses MongoDB as its database for storing user-related data, and Redis for caching and session management. Additionally, it integrates with RabbitMQ for message queuing, enabling efficient handling of notifications. For example, the service sends an email notification whenever a user gains a new follower.


Litter Service: The Litter Service manages posts ("lits") and user feeds. It handles the creation, retrieval, and organization of lits for individual users and their followers. The service uses MongoDB as its primary database for storing post data and Redis for caching. Additionally, it publishes WebSocket events whenever a new lit is created, enabling real-time updates for connected clients.


![Skärmbild_2025-01-17_132953](https://github.com/user-attachments/assets/54b0f40f-da80-4a2d-9c73-3cc48077fbe2)


