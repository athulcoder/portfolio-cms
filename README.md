# Unified Portfolio CMS

A centralized content management system designed to manage and synchronize personal professional data such as skills and projects across multiple platforms.

## Overview

This project currently provides a basic interface to:
- Add and manage skills
- Add and manage projects
- View stored data dynamically

The system is being developed with the intention of evolving into a centralized data source for all professional platforms.

## Objective

The primary goal is to establish a single source of truth for personal and professional information that can be reused across:

- Portfolio website
- Resume / CV
- LinkedIn and other professional platforms

This ensures consistency, reduces redundancy, and eliminates the need to manually update multiple platforms.

## Problem Statement

Maintaining consistency across multiple platforms is difficult due to:
- Repetitive manual updates
- Inconsistent descriptions of skills and projects
- Risk of outdated or missing information

This system aims to solve these issues by centralizing data management.

## Current Features

- Add new skills
- Add new projects
- View existing skills and projects
- Dynamic rendering of stored data

## Planned Features

- Authentication and access control
- API layer for external consumption (portfolio, resume, etc.)
- Structured schema for skills, projects, and metadata
- Export functionality (JSON, PDF for resumes)
- Tagging and categorization
- Versioning of data
- Integration support for third-party platforms (where APIs are available)

## Architecture (Planned)

The system will act as a central backend that exposes data to multiple clients:

        CMS Core (API + Database)
                  |
        -------------------------
        |     |       |        |
   Portfolio  Resume  LinkedIn  Others

All client applications will consume data from the CMS to ensure synchronization.

## Tech Stack

Current:
- Frontend: React / Next.js

Planned:
- Backend: Next.js API routes or Node.js
- Database: PostgreSQL or MongoDB
- Deployment: Vercel or cloud-based infrastructure

## Long-Term Direction

The system is intended to evolve into a centralized personal data platform where updates made in one place propagate across all connected platforms.

## License

MIT License