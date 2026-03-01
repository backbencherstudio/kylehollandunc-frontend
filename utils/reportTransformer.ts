// utils/reportTransformers.ts
export function formatTestType(items: Array<{ type: string; name: string }>): string {
    const testItems = items.filter(item => item.type === 'test')
    const addonItems = items.filter(item => item.type === 'addon')
    
    if (testItems.length === 0) return 'No tests'
    
    const mainTest = testItems[0]?.name || 'Standard Panel'
    
    if (addonItems.length > 0) {
        const addonNames = addonItems.map(item => item.name).join(', ')
        return `${mainTest} & ${addonNames}`
    }
    
    return mainTest
}

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}