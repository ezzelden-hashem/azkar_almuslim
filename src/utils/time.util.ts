export class CurrentMoment
{
    private readonly now: number;
    constructor(now?: number)
    {
        this.now = now ?? Date.now();
    }
    addHours(hours: number)
    {
        const newTime = this.now + (hours * 60 * 60 * 1000);
        return new CurrentMoment(newTime);
    }
    addMinutes(minutes: number)
    {
        const newTime = this.now + (minutes * 60 * 1000);
        return new CurrentMoment(newTime);
    }
    addSeconds(seconds: number)
    {
        const newTime = this.now + (seconds * 1000);
        return new CurrentMoment(newTime);
    }
    getMoment()
    {
        return this.now;
    }
}
export class TimeUnitConverter
{
    private readonly time: number;
    constructor(time?: number)
    {
        this.time = time ?? 0;
    }
    fromDays()
    {
        const newTime = this.time * 24 * 60 * 60 * 1000;
        return new TimeUnitConverter(newTime);
    }
    fromHours()
    {
        const newTime = this.time * 60 * 60 * 1000;
        return new TimeUnitConverter(newTime);
    }
    fromMinutes()
    {
        const newTime = this.time * 60 * 1000;
        return new TimeUnitConverter(newTime);
    }
    fromSeconds()
    {
        const newTime = this.time * 1000;
        return new TimeUnitConverter(newTime);
    }
    fromMilliseconds()
    {
        const newTime = this.time;
        return new TimeUnitConverter(newTime);
    }

    toDays()
    {
        const newTime = this.time / 1000 / 60 / 60 / 24;
        return new TimeUnitConverter(newTime);
    }
    toHours()
    {
        const newTime = this.time / 1000 / 60 / 60;
        return new TimeUnitConverter(newTime);
    }
    toMinutes()
    {
        const newTime = this.time / 1000 / 60;
        return new TimeUnitConverter(newTime);
    }
    toSeconds()
    {
        const newTime = this.time / 1000;
        return new TimeUnitConverter(newTime);
    }
    toMilliseconds()
    {
        const newTime = this.time;
        return new TimeUnitConverter(newTime);
    }
    getTime()
    {
        return this.time;
    }
    getTimeFormat(format: string)
    {
        const _ySymbols = format.split('').filter(s => 'Yy'.includes(s));
        const _MSymbols = format.split('').filter(s => 'M'.includes(s));
        const _dSymbols = format.split('').filter(s => 'Dd'.includes(s));
        const _hSymbols = format.split('').filter(s => 'Hh'.includes(s));
        const _mSymbols = format.split('').filter(s => 'm'.includes(s));
        const _sSymbols = format.split('').filter(s => 'Ss'.includes(s));
        const totalSeconds = Math.floor(this.time / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // padding helper
        const pad = (v: number, len: number) => v.toString().padStart(len, "0");

        // replacement map based on count of symbols
        const map: Record<string, string> = {
            // hours
            H: hours.toString(),
            HH: pad(hours, 2),

            // minutes
            m: minutes.toString(),
            mm: pad(minutes, 2),

            // seconds
            s: seconds.toString(),
            ss: pad(seconds, 2),
        };

        // build regex for all placeholders found in format
        const tokens = Object.keys(map).sort((a, b) => b.length - a.length); // longer first (HH before H)
        const regex = new RegExp(tokens.join("|"), "g");

        // replace dynamically
        return format.replace(regex, (match) => map[match]);

    }


}