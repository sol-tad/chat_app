import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => {
        const isOnline = onlineUsers.includes(chat._id);
        return (
          <div
            key={chat._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
            onClick={() => setSelectedUser(chat)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={chat.profilePic || "/avatar.png"}
                    alt={chat.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Status indicator */}
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-800 ${
                    isOnline ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
              </div>

              <h4 className="text-slate-200 font-medium truncate">
                {chat.fullName}
              </h4>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ChatsList;
