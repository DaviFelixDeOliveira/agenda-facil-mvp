export function validateRequiredText(value: string, label: string): string | null {
  if (!value.trim()) return `${label} é obrigatório.`
  return null
}

export function validateServiceName(value: string): string | null {
  const normalized = value.trim()
  if (!normalized) return 'Informe o nome do serviço.'
  if (normalized.length < 3) return 'O nome do serviço precisa ter pelo menos 3 caracteres.'
  if (!/[aeiouáéíóúãõâêô]/i.test(normalized)) return 'Informe um nome de serviço válido.'
  if (/[bcdfghjklmnpqrstvwxyz]{3,}/i.test(normalized.replace(/[^a-záéíóúãõâêô]/gi, ''))) {
    return 'Esse nome parece incompleto. Informe o nome real do serviço.'
  }
  return null
}
