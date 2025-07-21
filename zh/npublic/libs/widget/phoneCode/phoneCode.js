$define(['phoneCodeZhCN'],function (p) {
    const countriesIso = allCountries.map(country => country[1].toUpperCase())
    const countries = allCountries.map(country => ({
        name: country[0],
        iso2: country[1].toUpperCase(),
        dialCode: '+'+country[2],
        priority: country[3] || 0,
        areaCodes: country[4] || null
    }))
    return {
        countries:countries
    }
});