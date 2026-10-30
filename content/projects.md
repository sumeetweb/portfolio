+++
title = "Projects"
description = "ModelForge: Sumeet Naik's ML inference and observability platform, with FastAPI, TypeScript canary routing, model release validation, and AWS CDK infrastructure."
date = "2026-10-30"
author = "Sumeet Naik"
+++

## ModelForge

### ML Inference & Observability Platform

A personal project for exploring ML model serving and operations. An ML model needs more than a prediction endpoint. ModelForge explores how to validate a model release, route traffic between versions, isolate failures, and see what the services are doing.

I built it as a locally runnable engineering project with Python inference services, a TypeScript gateway, and an observability console.

[View source code](https://github.com/sumeetweb/modelforge) · [Architecture](https://github.com/sumeetweb/modelforge/blob/main/docs/architecture.md) · [Design decisions](https://github.com/sumeetweb/modelforge/blob/main/docs/design-decisions.md)

## Backend & reliability

FastAPI serves versioned scikit-learn models behind a Fastify gateway. The gateway validates requests and responses, routes traffic between stable and candidate versions, and bounds upstream work with deadlines, capped retries, circuit breakers, and fallback. Correlation IDs connect requests across services.

## Model lifecycle

Model artifacts have immutable versions, SHA-256 checksums, and explicit input/output contracts. Registration and held-out evaluation gates validate candidates before promotion. Release commands support canary traffic weights and operator-driven rollback to the previous configuration.

## Observability

Prometheus metrics cover traffic, latency, errors, fallback, and model readiness. OpenTelemetry carries trace context through the gateway and inference services. A console surfaces service and model telemetry, with Grafana dashboards and incident runbooks for investigation.

## Delivery & infrastructure

Docker Compose defines the local service and telemetry stack. GitHub Actions workflows cover linting, tests, artifact validation, image publication, and deployment gates. AWS CDK defines private ECS services, ECR, S3, CloudWatch, and scoped GitHub OIDC access.

**Project scope:** local service execution and infrastructure synthesis are documented. The AWS configuration is not presented as a live deployment. The classifier uses the Iris dataset to exercise the serving and release workflow; it is not a business model benchmark.

## Stack

- **Services:** Python, TypeScript, FastAPI, Fastify, scikit-learn.
- **Infrastructure:** Docker, Docker Compose, AWS CDK, ECS, ECR, S3, CloudWatch, GitHub Actions.
- **Operations:** Prometheus, Grafana, OpenTelemetry, Tempo, Pytest, Vitest, Locust.

[Read the project documentation](https://github.com/sumeetweb/modelforge#readme) · [View my resume](/resume/)
