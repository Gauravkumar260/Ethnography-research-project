import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { trace, context } from '@opentelemetry/api';

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'thesis-auth-service',
  }),
  traceExporter: new ConsoleSpanExporter(),
  instrumentations: [getNodeAutoInstrumentations()],
});

export const tracer = trace.getTracer('thesis-auth-service');

export function addAuthAttributes(operation: string, metadata: { risk_score?: number, mfa_used?: boolean, correlationId?: string } = {}) {
  const activeSpan = trace.getSpan(context.active());
  if (activeSpan) {
    activeSpan.setAttribute('auth.operation', operation);
    if (metadata.risk_score !== undefined) activeSpan.setAttribute('auth.risk_score', metadata.risk_score);
    if (metadata.mfa_used !== undefined) activeSpan.setAttribute('auth.mfa_used', metadata.mfa_used);
    if (metadata.correlationId) activeSpan.setAttribute('http.request.id', metadata.correlationId);
  }
}

export default sdk;
