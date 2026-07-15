"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "../../contexts/LocaleContext";
import { useAuth } from "../../contexts/AuthContext";

// Globe SVG icon
function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

// Bell SVG icon
function BellIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6"/>
      <path d="M9 17v1a3 3 0 0 0 6 0v-1"/>
    </svg>
  );
}

// Check SVG icon for lang dropdown
function CheckIcon() {
  return (
    <svg className="lg-check" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

export default function Header() {
  const { lang, setLang, t } = useLocale();
  const { user, profile, signOut } = useAuth();

  // Globe dropdown state
  const [langOpen, setLangOpen] = useState(false);
  // Avatar dropdown state
  const [avatarOpen, setAvatarOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  // Responsive search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchOverlayRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
      if (searchOverlayRef.current && !searchOverlayRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Mutual exclusion: opening one closes the other
  const toggleLang = () => {
    setLangOpen((v) => !v);
    setAvatarOpen(false);
  };

  const toggleAvatar = () => {
    setAvatarOpen((v) => !v);
    setLangOpen(false);
  };

  const handleSearch = (): void => {
    if (searchQuery.trim()) {
      console.log('Search:', searchQuery.trim());
      setSearchQuery('');
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); }
  };

  const openSearch = (): void => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  const closeSearch = (): void => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  // Build avatar initials from display_name or email
  const initials = profile?.display_name
    ? profile.display_name.slice(0, 2).toUpperCase()
    : user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : "??";

  const displayName = profile?.display_name ?? user?.email ?? "";
  const displayEmail = user?.email ?? "";

  // Logo variant by language (RTL for Hebrew, LTR for Russian)
  const logoSrc =
    lang === "he" ? "/logo-rtl.png" :
    lang === "ru" ? "/logo-ltr.png" :
    "/logo-mwl_transparent.png";

  return (
    <div className="hdr p1 bd">
      {/* Left: Logo */}
      <div className="hdr-left">
        <Link href="/courses" className="logo" style={{ textDecoration: "none" }}>
          <Image
            src={logoSrc}
            alt="Math With Love"
            width={128}
            height={32}
            style={{ display: "block", height: "32px", width: "auto",
                     objectFit: "contain", objectPosition: "left center" }}
            priority
            unoptimized
          />
        </Link>
      </div>

      {/* Center: Search — desktop shows full field, tablet/mobile shows icon */}
      <div className="hdr-center">
        {/* Desktop search field (hidden on tablet/mobile via CSS) */}
        <div className="srch-desktop">
          <input
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          <svg
            className="t3 si2 si2-clickable"
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            onClick={handleSearch}
            style={{ cursor: "pointer", pointerEvents: "auto" }}
          >
            <circle cx="10" cy="10" r="7"/>
            <line x1="21" y1="21" x2="15" y2="15"/>
          </svg>
        </div>

        {/* Tablet/mobile search icon (hidden on desktop via CSS) */}
        <div className="hico bd t2 srch-icon-mobile" onClick={openSearch}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="10" r="7"/>
            <line x1="21" y1="21" x2="15" y2="15"/>
          </svg>
        </div>
      </div>

      {/* Search overlay — tablet/mobile only, covers full header width */}
      {searchOpen && (
        <>
          <div className="srch-overlay-backdrop" onClick={closeSearch} />
          <div className="srch-overlay" ref={searchOverlayRef}>
          <div className="srch-overlay-field">
            <input
              ref={searchInputRef}
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <span
              className={`srch-overlay-icon${searchQuery.trim() ? ' active' : ''}`}
              onClick={handleSearch}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={1.5}
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
          </div>
          <span className="srch-close t2" onClick={closeSearch}>×</span>
        </div>
        </>
      )}

      {/* Right: Globe + Bell + Avatar */}
      <div className="hdr-right">

        {/* Globe dropdown */}
        <div className="lg-wrap" ref={langRef}>
          <div
            className={`hico bd t2${langOpen ? " on" : ""}`}
            onClick={toggleLang}
          >
            <GlobeIcon />
          </div>
          {langOpen && (
            <div className="lg-dropdown p1 bd">
              <div
                className={`lg-item${lang === "ru" ? " on" : ""}`}
                onClick={() => { setLang("ru"); setLangOpen(false); }}
              >
                <span>RU</span>
                {lang === "ru" && <CheckIcon />}
              </div>
              <div
                className={`lg-item${lang === "he" ? " on" : ""}`}
                onClick={() => { setLang("he"); setLangOpen(false); }}
              >
                <span>HE</span>
                {lang === "he" && <CheckIcon />}
              </div>
            </div>
          )}
        </div>

        {/* Bell */}
        <div className="hico bd t2">
          <BellIcon />
        </div>

        {/* Avatar dropdown */}
        <div className="hav-wrap" ref={avatarRef}>
          <div className="hav" onClick={toggleAvatar}>
            {initials}
          </div>
          {avatarOpen && (
            <div className="av-drop p1 bd">
              <div className="av-drop-user">
                <div className="av-drop-name">{displayName}</div>
                <div className="av-drop-email">{displayEmail}</div>
              </div>
              <div className="av-drop-divider" />
              <button className="av-drop-item" onClick={() => setAvatarOpen(false)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
                </svg>
                <span>{t("dropProfile")}</span>
              </button>
              <button className="av-drop-item" onClick={() => setAvatarOpen(false)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33a1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                <span>{t("dropSettings")}</span>
              </button>
              <div className="av-drop-divider" />
              <button className="av-drop-item danger" onClick={() => { signOut(); setAvatarOpen(false); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span>{t("dropLogout")}</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
