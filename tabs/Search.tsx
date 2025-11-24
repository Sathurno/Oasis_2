import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Image, TextInput, Animated, FlatList, TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import ScrollView from '../components/ScrollView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Header from '../components/Header';
import MicroMenu from '../components/MicroMenu';
import { ThemedText } from "../components/ThemedText";
import colors from "../constants/Colors";

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomePageNavigationProp;
}

const Search: React.FC<Props> = ({ navigation }) => {
    const { t } = useTranslation();

    // Animación para la imagen flotante
    const moveAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startFloatingAnimation = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(moveAnim, {
                        toValue: 10, // Mover hacia abajo
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(moveAnim, {
                        toValue: 0, // Mover hacia arriba
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        };

        startFloatingAnimation();
    }, [moveAnim]);

    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [searchStarted, setSearchStarted] = useState(false); // Para manejar si se ha iniciado una búsqueda
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedOption, setSelectedOption] = useState<'batteries' | 'lockers' | null>(null);
    
    const handleIconPress = () => {
        setShowCheckboxes(prev => !prev); // Alternar la visibilidad de los checkboxes
    };

    // Función para generar datos aleatorios
    const generateRandomData = (city: string) => {
        const places = [
            'Parque del Río',
            'Zoologico "Hogar"',
            'Parque Natural',
            'Jardín Botánico',
            'Reserva Natural'
        ];
        const randomPlace = places[Math.floor(Math.random() * places.length)];
        const randomBatteries = Math.floor(Math.random() * 18);
        const randomLockers = Math.floor(Math.random() * 36);

        return {
            name: `${randomPlace}, ${city}`,
            batteries: randomBatteries,
            lockers: randomLockers,
            available: randomBatteries > 0
        };
    };

    // Función para manejar el texto ingresado
    const handleSearch = (text: string) => {
        setSearchText(text);
        setSearchStarted(true);
    
        const cities = ['Valencia', 'Madrid', 'Barcelona', 'Sevilla', 'Zaragoza'];
        // Variantes de lugares
        const placeVariants = ['del Río', 'de la Plaza', 'del Parque', 'de la Avenida'];
        
        // Generar números aleatorios para cada dirección (máximo 2 dígitos: 1-99)
        const filteredSuggestions = cities.map(city => {
            const randomNumber = Math.floor(Math.random() * 99) + 1; // Números del 1 al 99
            const randomPlace = placeVariants[Math.floor(Math.random() * placeVariants.length)];
            return `${text} ${randomPlace} ${randomNumber}, ${city}, España`;
        });
        setSuggestions(filteredSuggestions);
    
        if (text.length > 0) {
            const simulatedResults = filteredSuggestions.map((suggestion, index) => {
                const city = suggestion.split(',')[1].trim();
                const data = generateRandomData(city);
                // Generar números totales aleatorios para cada resultado
                const randomTotalBatteries = data.batteries + Math.floor(Math.random() * 20) + 5;
                const randomTotalLockers = data.lockers + Math.floor(Math.random() * 30) + 10;
                return {
                    ...data,
                    name: suggestion.split(',')[0].trim(), // Usar la dirección completa con el número
                    totalBatteries: randomTotalBatteries,
                    totalLockers: randomTotalLockers,
                };
            });
            
            // Filtrar según la opción seleccionada
            const filteredResults = simulatedResults.filter(item => {
                if (selectedOption === 'batteries') {
                    return item.batteries > 0; // Solo mostrar resultados con baterías
                } else if (selectedOption === 'lockers') {
                    return item.lockers > 0; // Solo mostrar resultados con taquillas
                }
                return true; // Mostrar todos si no hay opción seleccionada
            });
            
            setResults(filteredResults);
        } else {
            setResults([]);
        }
    };
    const handleOptionSelect = (option: 'batteries' | 'lockers') => {
        if (selectedOption === option) {
            // Desmarcar la opción si ya está seleccionada
            setSelectedOption(null);
        } else {
            // Seleccionar una opción
            setSelectedOption(option);
        }
        setResults(results.map(result => ({
            ...result,
            visibleBatteries: result.batteries ,
            visibleLockers:  result.lockers,
        })));
    };
    

    // Función para manejar la selección de una sugerencia
    const handleSuggestionPress = (suggestion: string) => {
        setSearchText(suggestion); // Establecer el texto de la sugerencia en el input
        handleSearch(suggestion); // Establecer el texto de la sugerencia
        setSuggestions([]); // Cerrar las sugerencias
        textInputRef.current?.blur();

    };
    const textInputRef = useRef<TextInput>(null);
    // Función para limpiar el TextInput cuando el usuario hace click en el campo de nuevo
    const handleInputFocus = () => {
        if (searchStarted) {
            setSearchText(''); // Limpiar el campo de texto
            setSearchStarted(false); // Resetear la búsqueda
            setResults([]); // Limpiar los resultados
        }
    };

    // Renderizado de las tarjetas con los resultados
    const renderResult = ({ item, index }: any) => {
        const isUnavailable = index === 3; // Tarjeta roja

        const handleResultPress = () => {
            navigation.navigate('Result');
        };

        return (
            <TouchableOpacity
                activeOpacity={0.6} // Cambiar la opacidad al hacer clic
                onPress={() => {
                    // Crear batería mock
                    const newBattery = {
                        id: `${Date.now()}`,
                        name: item.name.split(',')[0], // Usar nombre del lugar
                        totalRemaining: '100%',
                        accumulatedCost: '0,00€',
                        startTime: new Date().toLocaleString()
                    };
                    navigation.navigate('Home', { newBattery });
                }}
            >
                <View
                    style={[
                        styles.resultCard,
                        isUnavailable && styles.unavailableCard
                    ]}
                >
                    <View style={styles.resultContent}>
                        <View>
                            <Text style={[styles.resultTitle, isUnavailable && { color: 'white' }]}>
                                {item.name}
                            </Text>
                            <View style={{flexDirection:"row"}}>
                            {(selectedOption === 'batteries' || selectedOption=== null) && (
                                <Text style={styles.resultInfo}>
                                    Baterías: {item.batteries}/{item.totalBatteries || item.batteries + Math.floor(Math.random() * 5)}
                                </Text>
                            )}
                            {(selectedOption === 'lockers' || selectedOption=== null) && (
                                <Text style={styles.resultInfo} >
                                    Taquillas: {item.lockers}/{item.totalLockers || item.lockers + Math.floor(Math.random() * 5)}
                                </Text>
                            )}
                            </View>
                        </View>

                        {/* Ícono de play al lado derecho */}
                        <Image
                            source={
                                isUnavailable
                                    ? require("../assets/images/Ícono_play_blanco.png")
                                    : require("../assets/images/Ícono_play.png")
                            }
                            style={styles.play}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    const renderCheckboxes = () => (
        <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => handleOptionSelect('batteries')}>
            <Text style={styles.checkboxText}>{selectedOption === 'batteries' ? '☑️' : '☐'} Baterías</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOptionSelect('lockers')}>
            <Text style={styles.checkboxText}>{selectedOption === 'lockers' ? '☑️' : '☐'} Taquillas</Text>
        </TouchableOpacity>
    </View>
    );




    // Renderizado de las sugerencias mientras escribe
    const renderSuggestion = (suggestion: string) => (
        <TouchableOpacity key={suggestion} onPress={() => handleSuggestionPress(suggestion)}>
            <Text style={styles.suggestionText}>{suggestion}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Encabezado */}
                <Header navigation={navigation} />

                <View style={styles.inputContainer}>
                    {/* Icono de lupa a la izquierda */}
                    <Image
                        source={require('../assets/images/Ícono_lupa.png')}
                        style={styles.iconLeft}
                    />

                    {/* TextInput */}
                    <TextInput
                        ref={textInputRef}
                        placeholder={t('Introduce una ubicación...')}
                        placeholderTextColor={colors.gray}
                        style={[styles.input, styles.textInput]}
                        value={searchText}
                        onChangeText={handleSearch}
                        onFocus={handleInputFocus} // Limpiar al enfocar
                        onBlur={() => {setSuggestions([]);}}
                    />

                    {/* Icono de configuración a la derecha */}
                    <TouchableOpacity onPress={handleIconPress}>
                        <Image
                            source={require('../assets/images/Ícono_configuration.png')}
                            style={styles.iconRight}
                        />
                    </TouchableOpacity>
                </View>

                {/* Mostrar checkboxes debajo del input como combobox */}
                {showCheckboxes && (
                    <View style={styles.filterDropdownContainer}>
                        {renderCheckboxes()}
                    </View>
                )}

                {/* Mostrar sugerencias mientras escribe */}
                {suggestions.length > 0 && (
                    <View style={styles.suggestionsContainer}>
                        {suggestions.map(renderSuggestion)}
                    </View>
                )}

                {/* Mostrar siempre la isla flotante */}
                <Animated.Image
                    source={require('../assets/images/Garden.png')}
                    style={[styles.imageBackground, { transform: [{ translateY: moveAnim }] }]}
                />


                {/* Si no hay resultados, mostrar ThemedText */}
                {results.length === 0 && searchText.length === 0 && (
                    <View style={styles.centro}>
                        <ThemedText type="title" sizeText={45} style={styles.buscarOasis}>{t('Buscar Oasis')}</ThemedText>

                    </View>
                )}

                {/* Mostrar resultados cuando hay búsqueda */}
                {results.length > 0 && (
                    <>
                        <FlatList
                            data={results.slice(0, 4)} // Mostrar solo 4 resultados
                            renderItem={renderResult}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.resultsContainer}
                        />
                    </>
                )}

                <MicroMenu navigation={navigation} currentScreen='Search' />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    play: {
        width: 24,
        height: 24,
        marginLeft: 10, // Espacio entre el texto y el ícono
    },
    centro: {
        alignItems: 'center',
        marginTop: 40,
    },
    imageBackground: {
        position: 'absolute',
        alignSelf: 'center',
        width: 370,
        height: 400,
        top: 270, // Ajuste para que quede en el fondo
        zIndex: -5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.3, // Borde solo en la parte inferior
        borderColor: colors.gray, // Color del borde inferior
        backgroundColor: 'white',
        paddingHorizontal: 10,
        marginBottom: 20,
        width: "100%",
        height: 50,
        zIndex: 5, // Para superponer las sugerencias
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 10,
    },
    textInput: {
        fontFamily: 'BalooTamma2_400Regular',
    },
    resultContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between', // Para que el ícono esté a la derecha
        alignItems: 'center',
    },
    iconLeft: {
        width: 20,
        height: 20,
        tintColor: colors.gray,
    },
    iconRight: {
        width: 30,
        height: 30,
    },
    buscarOasis: {
        position: "absolute",
        top: 200,
    },
    resultCard: {
        flexDirection: 'row', // Para alinear el texto y el ícono horizontalmente
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 35,
    },
    unavailableCard: {
        backgroundColor: '#ed6767', // Fondo rojo para la tarjeta "indisponible"

    },
    resultTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultInfo: {
        fontSize: 14,
        color: colors.gray,
        marginRight: 10,
    },
    resultsContainer: {
        paddingBottom: 20,
    },
    suggestionsContainer: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 5,
        zIndex: 5, // Para superponer a otros elementos
        position: 'absolute',
        top: 215, // Ajustar según tu layout
        width: '100%',
    },
    suggestionText: {
        color: 'black',
        fontSize: 16,
        paddingVertical: 5,
    },
    image: {
        width: 330,
        height: 370,
        marginTop: 10,
        position: 'absolute',
        zIndex: -1, // Para que quede debajo de las tarjetas
    },
    filterDropdownContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: colors.gray,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 6,
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    checkboxText: {
        fontSize: 14,
        marginRight: 15,
        color: colors.negro,
    },
    
});

export default Search;
