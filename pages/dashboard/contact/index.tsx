"use client";
import { ComponentType, useEffect, useState } from "react";
import { Mail, User, Clock, MessageSquare } from "lucide-react";
import Layout from "@/component/dashboard/Layout";

interface Contact {
  _id: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  Replyed?: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch("/api/contact", { method: "GET" });
        if (!res.ok) throw new Error("Failed to load contacts");

        const result = await res.json();
        const sortedContacts = result.contacts.sort(
          (a: Contact, b: Contact) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setContacts(sortedContacts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, []);

  const newContactsCount = contacts.filter(
    (c) => new Date(c.createdAt) >= new Date(Date.now() - 24 * 60 * 60 * 1000)
  ).length;
 
  // count of contacts not replied
  const unReplyedCount = contacts.filter((c) => c.Replyed !== "yes").length;

  const openReplyModal = (contact: Contact) => {
    setCurrentContact(contact);
    setReplyMessage("");
    setReplyModalOpen(true);
  };

  const sendReply = async () => {
    if (!currentContact || !replyMessage) return;

    const res = await fetch("/api/contact/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactId: currentContact._id, replyMessage }),
    });

    if (res.ok) {
      setContacts((prev) =>
        prev.map((c) =>
          c._id === currentContact._id ? { ...c, Replyed: "yes" } : c
        )
      );
      setReplyModalOpen(false);
    } else {
      alert("Failed to send reply.");
    }
  };

  return (
    <Layout >
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <header className="mb-6 bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800">Contact Queries</h1>
        <p className="text-gray-600">
          Review messages sent by users via the contact form.
        </p>
      </header>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard Icon={Mail} label="Total Queries" value={contacts.length} bgColor="bg-blue-500" />
        <SummaryCard Icon={User} label="New Queries" value={newContactsCount} bgColor="bg-green-500" />
        <SummaryCard Icon={Clock} label="Last Query" value={contacts.length ? new Date(contacts[0].createdAt).toLocaleString() : "N/A"} bgColor="bg-yellow-500" />
        <SummaryCard Icon={MessageSquare} label="Unread Queries" value={unReplyedCount} bgColor="bg-red-500" />
      </div>

      {/* CONTACT LIST */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">All Queries</h2>
        {loading ? (
          <p>Loading...</p>
        ) : contacts.length === 0 ? (
          <p className="text-gray-500">No contact queries yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-lg">{contact.subject}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(contact.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{contact.message}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" /> {contact.email}
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span
                    className={`inline-block px-3 py-1 text-sm rounded-full ${
                      contact.Replyed === "yes" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {contact.Replyed === "yes" ? "Replied" : "Not Replied"}
                  </span>
                  <button
                    onClick={() => openReplyModal(contact)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* REPLY MODAL */}
      {replyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Reply to {currentContact?.email}</h2>
            <textarea
              className="w-full p-3 border rounded mb-4"
              rows={5}
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply here..."
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setReplyModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={sendReply}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
}

function SummaryCard({
  Icon,
  label,
  value,
  bgColor,
}: {
  Icon: ComponentType<any>;
  label: string;
  value: string | number;
  bgColor: string;
}) {
  return (
    <div className="flex items-center border-l-10 border-r-8 border-amber-50 p-4 bg-white rounded-xl shadow hover:shadow-lg transition-shadow">
      <div className={`${bgColor} p-3 rounded-full flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="ml-4 flex flex-col items-center justify-center">
        <p className="text-gray-500">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
