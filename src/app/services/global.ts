export class Global {


  private static URL = 'https://back-crud-images.vercel.app/api';
  // public static URL: string = "http://localhost:3000/api";



  public static IGLESIAS: string[] = [
    'CALLIRPA', 'CHAPICHAPINI', 'ROSAPATAYARIBAY', 'TOMATA', 'TOPOHOCO', 'TUMARAPI',// ZONA ANDINA PACAJES
    'CAQUIAVIRI', 'COLQUE ALTA', 'CHIPANAMAYA', 'LLIMPHI', 'LACALACA', 'LAURA AFETUNI', // ZONA CAQUIAVIRI
    'BAJO PANPAHASI', 'BUENOS AIRES', 'CENTRAL LA PAZ', 'EL BUEN PASTOR', 'KOINONIA', 'LA PORTADA',
    'MEMORIAL WINCHESTER', 'MIRAFLORES', 'MUNAYPATA', 'PASANKERI', 'VILLA FÁTIMA', 'ESCOBAR URIA',
    'PLAYA VERDE', 'SOPOCACHI BAJO', 'CHINCHAYA', 'CIUDADELA FERROVIARIA', // ZONA NORTE
    'ARANJUEZ', 'AVIRCATO', 'BELLA VISTA', 'CODAVISA', 'COTA COTA', '23 DE MARZO', 'MARQUIRIVI', // ZONA SUR
    'ANTARANI', 'BOTIJLACA', 'CANTUYO', 'COMANCHE', 'KELLAKELLA BAJA', 'JEKERI', 'ROSAPATA DE TULI', 'KELLAKELLA ALTA', // ZONA COMANCHE
    'CHULLUNKHAYANI', 'CONIRI', 'HILATA SAN JORGE', 'IRPUMA', 'VIACHA', 'COLQUENCHA', ' NUEVA TILATA 3',
    'TONCOPUJIO', 'MARISCAL SANTA CRUZ', // ZONA VIACHA
    'COHONI', 'TACACHÍA', 'QUILIHUAYA', // ZONA ILLIMANI
    'CALARI', 'COROCORO', 'GENERAL PANDO', 'PUTUNI', 'TUPALTUPA', 'TOTORANI', 'SICUIPATA', // ZONA MINERA
    'CALASAYA', 'CRUCERO', 'PATACAMAYA', 'CALTECA', 'CALACACHI', 'TOLOMA', // ZONA PATACAMAYA TAMBO QUEMADO
    'FE EN CRISTO', 'FILADELFIA', 'NUEVA VIDA', 'SHADDAI', 'LEUQUE', 'ALTO MUNAYPATA', 'IROCOTA'
    ].sort();

    public static ZONAS: string[] = ['CIUDAD NORTE', 'CIUDAD CENTRAL', 'CIUDAD SUR', 'MINERA', 'VIACHA', 'ZONA PACAJES', 'COMANCHE', 'TAMBO QUEMADO', 'CAQUIAVIRI', 'SUCRE'];
    public static DIAS: string[] = ['SABADO', 'DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
    // numeros.sort(function(a, b){return a - b});

    public static AREAS: any[] = [
      { area: 'Ministro de Educación Cristiana', sigla: 'CED' },
      { area: 'Capellán', sigla: 'CHP' },
      { area: 'Asignación Distrital', sigla: 'DA-A' },
      { area: 'Asignación Distrital Interino', sigla: 'DIA-A' },
      { area: 'Superintendente de Distrito', sigla: 'DS-S' },
      { area: 'Educación', sigla: 'EDU' },
      { area: 'Servicio de Evangelismo, juvilado', sigla: 'ESR' },
      { area: 'Evangelista, Comisionado', sigla: 'EVC' },
      { area: 'Evangelista, Registrado', sigla: 'EVR' },
      { area: 'Evangelista, Permanente', sigla: 'EVT' },
      { area: 'Asignación a la Iglesia General', sigla: 'GA-A' },
      { area: 'Sin Asignación', sigla: 'U' },
      { area: 'Superintendente General', sigla: 'GS' },
      { area: 'Pastor', sigla: 'PAS' },
      { area: 'Servicio Pastoral, Tiempo Parcial', sigla: 'PSV-PT' },
      { area: 'Servicio Pastoral, Tiempo Completo', sigla: 'PSV-FT' },
      { area: 'Jubilado, Con Asignación', sigla: 'RA' },
      { area: 'Jubilado, Sin Asignación', sigla: 'RU' },
      { area: 'Evangelista de Música, Comisionado', sigla: 'SEC' },
      { area: 'Evangelista de Música, Registrado', sigla: 'SER' },
      { area: 'Servicio Especial /Interdenominacional', sigla: 'SPC' },
      { area: 'Estudiante', sigla: 'STU' },
      { area: 'En Proceso de Transferencia', sigla: 'TRF' },
    ].sort((a:any, b:any)=>{
      if ( a.area.toLowerCase() < b.area.toLowerCase()){
        return -1;
      }
      if ( a.area.toLowerCase() > b.area.toLowerCase()){
        return 1;
      }
      return 0;
    });
}
