import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface OpcionVARK {
  texto: string;
  categoria: string;
  seleccionada: boolean;
}

interface PreguntaVARK {
  texto: string;
  opciones: OpcionVARK[];
}

const PREGUNTAS_INICIALES: PreguntaVARK[] = [
  {
    texto: 'Estás en una clase nueva y el profesor explica un concepto difícil. Usted preferiría:',
    opciones: [
      { texto: 'Que dibuje un esquema o mapa mental.', categoria: 'V', seleccionada: false },
      { texto: 'Que lo explique con un ejemplo hablado.', categoria: 'A', seleccionada: false },
      { texto: 'Leer un folleto con la explicación.', categoria: 'R', seleccionada: false },
      { texto: 'Hacer un ejercicio práctico de inmediato.', categoria: 'K', seleccionada: false },
    ],
  },
  {
    texto: 'Te descargas una App nueva de edición de fotos. ¿Cómo aprendes a usarla?',
    opciones: [
      { texto: 'Miras las capturas de pantalla de ayuda.', categoria: 'V', seleccionada: false },
      {
        texto: 'Buscas un video tutorial con alguien hablando.',
        categoria: 'A',
        seleccionada: false,
      },
      {
        texto: "Lees el manual de 'Ayuda' o las notas de la versión.",
        categoria: 'R',
        seleccionada: false,
      },
      {
        texto: 'Empiezas a apretar todos los botones para ver qué hacen.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto: 'Necesitas dar direcciones a un amigo para ir a la casa de alguien. Usted:',
    opciones: [
      { texto: 'Le dibujas un croquis o mapa.', categoria: 'V', seleccionada: false },
      { texto: 'Le dices cómo llegar o envías un audio.', categoria: 'A', seleccionada: false },
      { texto: 'Le escribes la explicación de como llegar.', categoria: 'R', seleccionada: false },
      {
        texto: 'Le pides que te siga en tu auto o lo acompañas.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto: 'No estas seguro si una palabra se escribe "dependiente" o "dependante". Usted:',
    opciones: [
      {
        texto: 'Ves la palabra en tu mente y eliges la que parece correcta.',
        categoria: 'V',
        seleccionada: false,
      },
      { texto: ' La pronuncias en voz alta para escucharla.', categoria: 'A', seleccionada: false },
      { texto: 'La buscas en el diccionario.', categoria: 'R', seleccionada: false },
      {
        texto: 'La escribes en un papel para ver cuál se ve mejor.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto:
      'Estas planeando unas vacaciones con tus amistades y quieres algunos consejos sobre el plan. Usted:',
    opciones: [
      {
        texto: 'Usas un mapa o sitios web para mostrarles los lugares.',
        categoria: 'V',
        seleccionada: false,
      },
      {
        texto: 'Les llamas por teléfono o les envía un mensaje de voz.',
        categoria: 'A',
        seleccionada: false,
      },
      { texto: 'Les das una copia del itinerario impreso.', categoria: 'R', seleccionada: false },
      {
        texto: 'Describes algunas de las actividades que harán.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto: 'Vas a cocinar algo especial para tu familia. Usted:',
    opciones: [
      {
        texto: 'Miras las fotos en un libro de cocina para inspirarte.',
        categoria: 'V',
        seleccionada: false,
      },
      {
        texto: 'Le preguntas a un amigo o familiar por sugerencias.',
        categoria: 'A',
        seleccionada: false,
      },
      { texto: 'Lees una receta de un libro o de internet.', categoria: 'R', seleccionada: false },
      {
        texto: 'Cocinas algo que ya conoces sin necesidad de instrucciones.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto:
      'Vas a comprar una cámara digital o un celular. Aparte del precio, ¿qué es lo que más influye en su decisión?',
    opciones: [
      {
        texto: 'Que el diseño sea moderno y se vea bien.',
        categoria: 'V',
        seleccionada: false,
      },
      {
        texto: 'Los consejos que te da el vendedor o tus amigos.',
        categoria: 'A',
        seleccionada: false,
      },
      {
        texto: 'Los detalles sobre sus características y funciones.',
        categoria: 'R',
        seleccionada: false,
      },
      {
        texto: 'Probarlo, manipularlo y usar sus controles.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto: 'Tienes un problema con tu rodilla. Usted preferiría que el médico:',
    opciones: [
      {
        texto: 'Te muestre un diagrama o una radiografía de lo que está mal.',
        categoria: 'V',
        seleccionada: false,
      },
      {
        texto: 'Te explique verbalmente qué es lo que está mal.',
        categoria: 'A',
        seleccionada: false,
      },
      {
        texto: 'Te dé un folleto que explique el problema.',
        categoria: 'R',
        seleccionada: false,
      },
      {
        texto: ' Use un modelo de plástico de una rodilla para mostrarte qué sucede.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto: 'Prefieres un sitio web que tenga:',
    opciones: [
      {
        texto: 'Un diseño interesante y efectos visuales.',
        categoria: 'V',
        seleccionada: false,
      },
      {
        texto: 'Canales de audio, podcasts o videos con explicaciones.',
        categoria: 'A',
        seleccionada: false,
      },
      {
        texto: 'Descripciones escritas detalladas e información textual.',
        categoria: 'R',
        seleccionada: false,
      },
      {
        texto: 'Cosas que usted pueda cliquear, arrastrar o probar.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto: 'Has terminado un curso y necesitas algunas críticas para mejorar. Usted prefiere:',
    opciones: [
      {
        texto: 'Que usen gráficos o tablas para mostrar tu progreso.',
        categoria: 'V',
        seleccionada: false,
      },
      {
        texto: 'Que te expliquen tus fallas en una charla personal.',
        categoria: 'A',
        seleccionada: false,
      },
      {
        texto: 'Que te entreguen un informe escrito con tus resultados.',
        categoria: 'R',
        seleccionada: false,
      },
      {
        texto: 'Que te den ejemplos reales de lo que hiciste bien o mal.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto: 'Tienes que elegir comida en un restaurante o café. Usted:',
    opciones: [
      {
        texto: 'Miras lo que otros están comiendo o miras las fotos del menú.',
        categoria: 'V',
        seleccionada: false,
      },
      {
        texto: 'Le pides al camarero que te recomiende algo.',
        categoria: 'A',
        seleccionada: false,
      },
      {
        texto: 'Lees las descripciones detalladas en el menú.',
        categoria: 'R',
        seleccionada: false,
      },
      {
        texto: 'Eliges algo que ya has probado antes.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
  {
    texto:
      'Tienes que dar una queja sobre un servicio en un hotel o restaurante. Usted preferiría:',
    opciones: [
      {
        texto: 'Ir a la página web y llenar un formulario de reclamos.',
        categoria: 'V',
        seleccionada: false,
      },
      {
        texto: 'Hablar con el gerente cara a cara.',
        categoria: 'A',
        seleccionada: false,
      },
      {
        texto: 'Escribir una carta o un correo electrónico.',
        categoria: 'R',
        seleccionada: false,
      },
      {
        texto: 'Mostrarle a la persona exactamente cuál es el problema.',
        categoria: 'K',
        seleccionada: false,
      },
    ],
  },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  preguntas: PreguntaVARK[] = [...PREGUNTAS_INICIALES];
  quizComenzado: boolean = false;
  testFinalizado: boolean = false;
  indiceActual: number = 0;
  resultadoFinal: string | null = null;

  puntaje = { V: 0, A: 0, R: 0, K: 0 };

  empezarQuiz() {
    this.quizComenzado = true;
    this.indiceActual = 0;
  }

  finalizarQuiz() {
    this.puntaje = { V: 0, A: 0, R: 0, K: 0 };

    this.preguntas.forEach((pregunta) => {
      pregunta.opciones.forEach((opcion) => {
        if (opcion.seleccionada) {
          const cat = opcion.categoria as keyof typeof this.puntaje;
          this.puntaje[cat]++;
        }
      });
    });

    const valores = Object.values(this.puntaje);
    const maximo = Math.max(...valores);

    if (maximo === 0) {
      this.resultadoFinal = 'Sin definir (No seleccionaste opciones)';
      return;
    }

    const ganadorLetra = Object.keys(this.puntaje).find(
      (key) => this.puntaje[key as keyof typeof this.puntaje] === maximo,
    );

    const nombres: any = {
      V: 'Visual',
      A: 'Auditivo',
      R: 'Lecto-Escritura',
      K: 'Kinestésico',
    };
    this.resultadoFinal = nombres[ganadorLetra!];
  }

  calcularResultado() {
    const valores = Object.values(this.puntaje);
    const maximo = Math.max(...valores);
    const ganador = Object.keys(this.puntaje).find(
      (key) => this.puntaje[key as keyof typeof this.puntaje] === maximo,
    );

    const nombres: any = { V: 'Visual', A: 'Auditivo', R: 'Lecto-Escritura', K: 'Kinestésico' };
    this.resultadoFinal = nombres[ganador!] || 'Multimodal';
  }

  reiniciarQuiz() {
    this.indiceActual = 0;
    this.quizComenzado = false;
    this.testFinalizado = false;
    this.resultadoFinal = null;
    this.puntaje = { V: 0, A: 0, R: 0, K: 0 };

    this.preguntas = PREGUNTAS_INICIALES.map((p) => ({
      ...p,
      opciones: p.opciones.map((o) => ({ ...o, seleccionada: false })),
    }));
  }

  siguientePregunta() {
    if (this.indiceActual < this.preguntas.length - 1) {
      this.indiceActual++;
    } else {
      this.quizComenzado = false;
      this.testFinalizado = true;
      this.finalizarQuiz();
    }
  }

  seleccionarOpcion(cat: string) {
    const categoria = cat as keyof typeof this.puntaje;
    this.puntaje[categoria]++;

    if (this.indiceActual < this.preguntas.length - 1) {
      this.indiceActual++;
    } else {
      this.quizComenzado = false;
    }
  }
}
