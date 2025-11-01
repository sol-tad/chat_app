import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => {
        const isOnline = onlineUsers.includes(contact._id);
        return (
          <div
            key={contact._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
            onClick={() => setSelectedUser(contact)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={contact.profilePic || "/avatar.png"}
                    alt={contact.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Online/Offline indicator */}
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-800 ${
                    isOnline ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
              </div>

              <h4 className="text-slate-200 font-medium">{contact.fullName}</h4>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ContactList;
