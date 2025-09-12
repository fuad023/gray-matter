import { useEffect, useMemo, useRef, useState } from "react";
import "./style.css"; 
import { Link } from "react-router-dom"; 

export default function Profile() {
  const [tab, setTab] = useState("general");
  const [firstName, setFirstName]   = useState("");
  const [lastName, setLastName]     = useState("");
  const [displayName, setDisplay]   = useState("");
  const [phone, setPhone]           = useState("");
  const [bio, setBio]               = useState("");

  const [avatarUrl, setAvatarUrl]   = useState("profilepic.png");
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  const headerName = useMemo(
    () => [firstName, lastName].filter(Boolean).join(" ").trim(),
    [firstName, lastName]
  );

  const loadAvatar = () => {
    const url = `/api/avatar?t=${Date.now()}`;
    setAvatarUrl(url);
  };

  const writeGeneralForm = (u) => {
    if (!u) return;
    setFirstName(u.firstName ?? "");
    setLastName(u.lastName ?? "");
    setDisplay(u.displayName ?? "");
    setPhone(u.phone ?? "");
    setBio(u.bio ?? "");
  };

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/profile");
        const j = await r.json();
        if (j?.ok && j.user) writeGeneralForm(j.user);
      } catch {

      }
      loadAvatar();
    })();
  }, []);


  const onSubmitGeneral = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !displayName) {
      alert("Please fill First name, Last name, and Display name.");
      return;
    }
    try {
      const payload = { firstName, lastName, displayName, phone, bio };
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to save profile");
      alert("Profile saved!");
      loadAvatar();
    } catch (err) {
      alert("Save failed: " + err.message);
    }
  };

  const onChooseAvatar = (file) => {
    if (!file) return;
    setAvatarFile(file);

    const localURL = URL.createObjectURL(file);
    setAvatarUrl(localURL);
  };

  const onSubmitPhoto = async (e) => {
    e.preventDefault();
    if (!avatarFile) return alert("Choose an image first");
    const fd = new FormData();
    fd.append("avatar", avatarFile);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Upload failed");
      alert("Avatar uploaded!");

      loadAvatar();
      setAvatarFile(null);
      if (fileInputRef.current) fileInputRef.current.value = ""; 
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const oldPassword = form.get("oldPassword") || "";
    const newPassword = form.get("newPassword") || "";
    if (!newPassword) return alert("Please enter a new password.");
    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Password change failed");
      alert("Password updated!");
      e.currentTarget.reset();
    } catch (err) {
      alert("Failed: " + err.message);
    }
  };


  return (
    <div>
      {/* Banner */}
      {/* <img src="profile.png" alt="Banner" className="banner" /> */}
      <div style={{ height: "70px" }}>This is home</div>

      <main className="container">
        {/* Header */}
        <section className="profile-header">
          {/* If server avatar fails, fall back like original */}
          <img
            src={avatarUrl}
            alt="Avatar"
            className="avatar"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "profilepic.png";
            }}
          />
          <h1 className="name">{headerName}</h1>
        </section>

        {/* Layout */}
        <section className="content">
          {/* Sidebar */}
          <aside className="sidebar">
            <nav className="menu">
              <button
                type="button"
                className={`menu-item ${tab !== "logout" ? "active" : ""}`}
                onClick={() => setTab("general")}
              >
                <span className="icon">⚙️</span>
                <span>Settings</span>
              </button>

              {/* 🔁 Updated: route to /logout via React Router */}
              <Link to="/logout" className="menu-item">
                <span className="icon">🚪</span>
                <span>Logout</span>
              </Link>
            </nav>
          </aside>

          {/* Panel */}
          <section className="panel">
            {/* Tabs */}
            <div className="tabs">
              <button
                className={`tab ${tab === "general" ? "active" : ""}`}
                onClick={() => setTab("general")}
              >
                General
              </button>
              <button
                className={`tab ${tab === "photo" ? "active" : ""}`}
                onClick={() => setTab("photo")}
              >
                Profile Picture
              </button>
              <button
                className={`tab ${tab === "password" ? "active" : ""}`}
                onClick={() => setTab("password")}
              >
                Password
              </button>
            </div>

            {/* Panels */}
            <div className="panels">
              {/* General */}
              {tab === "general" && (
                <form className="form panel-content active" onSubmit={onSubmitGeneral}>
                  <div className="row two">
                    <label className="field">
                      <span className="label">First name</span>
                      <input
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </label>
                    <label className="field">
                      <span className="label">Last name</span>
                      <input
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="row two">
                    <label className="field">
                      <span className="label">
                        Display name<span className="req">*</span>
                      </span>
                      <input
                        type="text"
                        placeholder="Display name"
                        value={displayName}
                        onChange={(e) => setDisplay(e.target.value)}
                      />
                    </label>
                    <label className="field">
                      <span className="label">Phone number</span>
                      <input
                        type="tel"
                        placeholder="+8801XXXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="row">
                    <label className="field">
                      <span className="label">Biographical Info</span>
                      <textarea
                        rows={4}
                        placeholder="Write a short bio..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="actions">
                    <button
                      type="button"
                      className="btn ghost"
                      onClick={() =>
                        writeGeneralForm({
                          firstName: "",
                          lastName: "",
                          displayName: "",
                          phone: "",
                          bio: "",
                        })
                      }
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              )}

              {/* Photo */}
              {tab === "photo" && (
                <form className="form panel-content active" onSubmit={onSubmitPhoto}>
                  <div className="row">
                    <div className="photo-block">
                      <img
                        src={avatarUrl}
                        alt="Current avatar"
                        className="avatar-lg"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "profilepic.png";
                        }}
                      />
                      <div className="upload-controls">
                        <label className="field">
                          <span className="label">Upload new picture</span>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => onChooseAvatar(e.target.files?.[0])}
                          />
                        </label>
                        <button type="submit" className="btn primary">Upload</button>
                      </div>
                    </div>
                  </div>
                  <p className="hint">Recommended: square image, at least 300×300px.</p>
                </form>
              )}

              {/* Password */}
              {tab === "password" && (
                <form className="form panel-content active" onSubmit={onSubmitPassword}>
                  <div className="row two">
                    <label className="field">
                      <span className="label">Old password</span>
                      <input type="password" name="oldPassword" placeholder="••••••••" />
                    </label>
                    <label className="field">
                      <span className="label">New password</span>
                      <input type="password" name="newPassword" placeholder="••••••••" />
                    </label>
                  </div>
                  <div className="actions">
                    <button
                      type="button"
                      className="btn ghost"
                      onClick={(e) => e.currentTarget.form?.reset()}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn primary">Update Password</button>
                  </div>
                </form>
              )}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
