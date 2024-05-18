export type Contract = {
        id: number,
        signatoryId: number,
        hourlyPrice: number,
        hoursVolume: number,
        total: number,
        status: number,
        isVerified: boolean,
        startDate: string,
        endDate: string,
}